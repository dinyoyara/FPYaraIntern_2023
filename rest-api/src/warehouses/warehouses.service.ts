import { InjectModel } from '@nestjs/sequelize';
import {
  ForbiddenException,
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

import { WarehouseDto, WarehouseInfoDto, WarehouseWithProductDto } from './dto';
import { Warehouse } from './warehouses.model';
import { MathService } from 'src/math/math.service';
import { MovementsService } from 'src/movements/movements.service';
import { ProductInfoModel, ProductWithExprMode } from '../products/models';
import { UNKNOWN } from 'src/constants';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectModel(Warehouse)
    private warehouseModel: typeof Warehouse,
    private mathService: MathService,
    @Inject(forwardRef(() => MovementsService))
    private movementsService: MovementsService,
  ) {}

  createAsync = async (
    dto: WarehouseDto,
    customerId: string,
  ): Promise<Warehouse> => {
    try {
      const result = await this.warehouseModel.create({
        ...dto,
        customerId,
      });

      return result;
    } catch (error) {
      throw new BadRequestException(error.errors[0].message);
    }
  };

  getAllByCustomerIdAsync = async (
    customerId: string,
  ): Promise<WarehouseInfoDto[]> => {
    const warehouses = await this.warehouseModel.findAll({
      where: { customerId: customerId },
      attributes: ['id', 'name', 'size', 'type'],
    });
    return await Promise.all(
      warehouses.map(
        async (w) => await this.warehouseToWarehouseInfoDtoAsync(w),
      ),
    );
  };

  getOneAsync = async (id: string): Promise<WarehouseInfoDto> => {
    const warehouse = await this.warehouseModel.findByPk(id);
    if (!warehouse) return null;
    return await this.warehouseToWarehouseInfoDtoAsync(warehouse);
  };

  updateAsync = async (
    id: string,
    customerId: string,
    dto: WarehouseDto,
  ): Promise<Warehouse> => {
    try {
      const warehouse = await this.warehouseModel.findByPk(id);
      if (warehouse.customerId != customerId) {
        throw new ForbiddenException('not authorized');
      }
      const warehouseWithProducts = await this.getOneDetails(id);
      if (
        warehouseWithProducts.products.length > 0 &&
        warehouseWithProducts.type !== dto.type &&
        warehouseWithProducts.type !== UNKNOWN
      ) {
        throw new BadRequestException('not allowed to change type');
      }
      await this.warehouseModel.update(
        { ...dto },
        {
          where: { id: id },
        },
      );
      return this.warehouseModel.findByPk(id);
    } catch (error) {
      if (
        error.response.statusCode === 400 ||
        error.response.statusCode === 403
      ) {
        throw error;
      }
      throw new BadRequestException(error.errors[0].message);
    }
  };

  deleteByIdAsync = async (
    id: string,
    customerId: string,
  ): Promise<Warehouse> => {
    try {
      const warehouseWithFreeSpace = await this.getOneAsync(id);
      if (warehouseWithFreeSpace.freeSpace < warehouseWithFreeSpace.size) {
        throw new BadRequestException('warehouse has products');
      }
      const warehouse = await this.warehouseModel.findByPk(id);
      if (warehouse.customerId != customerId) {
        throw new ForbiddenException('not authorized');
      }
      warehouse.destroy();
      return warehouse;
    } catch (error) {
      if (
        error.response.statusCode === 400 ||
        error.response.statusCode === 403
      ) {
        throw error;
      }
      throw new BadRequestException(error.errors[0].message);
    }
  };

  getOneDetails = async (id: string): Promise<WarehouseWithProductDto> => {
    const warehouse = await this.getById(id);
    if (!warehouse) return null;
    const warehouseWithInfo = await this.warehouseToWarehouseInfoDtoAsync(
      warehouse,
    );
    const result: WarehouseWithProductDto = {
      id: warehouseWithInfo.id,
      name: warehouseWithInfo.name,
      size: warehouseWithInfo.size,
      freeSpace: warehouseWithInfo.freeSpace,
      type: warehouseWithInfo.type,
      products: await this.getWarehouseProducts(id),
    };
    return result;
  };

  getById = async (id: string): Promise<Warehouse> => {
    return this.warehouseModel.findByPk(id);
  };

  private getWarehouseProducts = async (
    id: string,
  ): Promise<ProductInfoModel[]> => {
    const movements =
      await this.movementsService.getAllMovementsByWarehouseIdAsync(id);
    const productExprList: ProductWithExprMode[] = movements.reduce(
      (acc, m) => {
        let product = acc.find((x) => x.id === m.productId);
        if (!product) {
          product = {
            id: m.productId,
            expr: '0',
            name: m.product.name,
            size: m.product.size,
            price: m.product.price,
          };
          acc.push(product);
        }
        const sign = m.importedWarehouseId === id ? '+' : '-';
        product.expr = product.expr + sign + '(' + m.productCount + ')';

        return acc;
      },
      [],
    );

    return await Promise.all(
      productExprList.map(async (pr) => await this.calculateProductCount(pr)),
    );
  };

  private getFreeSpace = async (id: string): Promise<number> => {
    let expr = '';
    const warehouse = await this.getById(id);
    expr += warehouse.size;

    const movements =
      await this.movementsService.getAllMovementsByWarehouseIdAsync(id);

    expr = movements.reduce((acc, x) => {
      const sign = x.importedWarehouseId === id ? '-' : '+';
      acc = acc + sign + '(' + x.product.size + '*' + x.productCount + ')';
      return acc;
    }, expr);

    const result = await this.mathService.calculateAsync(expr);

    return result;
  };

  private warehouseToWarehouseInfoDtoAsync = async (
    warehouse: Warehouse,
  ): Promise<WarehouseInfoDto> => {
    return {
      ...warehouse.dataValues,
      freeSpace: await this.getFreeSpace(warehouse.dataValues.id),
    };
  };

  private calculateProductCount = async (
    productDto: ProductWithExprMode,
  ): Promise<ProductInfoModel> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { expr, ...product } = productDto;

    return {
      ...product,
      count: await this.mathService.calculateAsync(expr),
    };
  };
}
