import {
  Inject,
  forwardRef,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { MovementDto } from './dto';
import { UNKNOWN } from '../constants';
import { Movement } from './movements.model';
import { Product } from '../products/products.model';
import { ErrorsService } from '../errors/errors.service';
import { Warehouse } from '../warehouses/warehouses.model';
import { ProductsService } from '../products/products.service';
import { WarehousesService } from '../warehouses/warehouses.service';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement)
    private movementModel: typeof Movement,
    @Inject(forwardRef(() => WarehousesService))
    private warehouseService: WarehousesService,
    private productService: ProductsService,
    private errorsService: ErrorsService,
  ) {}

  createMovement = async (
    dto: MovementDto,
    customerId: string,
  ): Promise<Movement> => {
    try {
      const { importedWarehouseId, exportedWarehouseId, productId } = dto;
      const isOwner = await this.customerIsOwner(
        customerId,
        importedWarehouseId,
        exportedWarehouseId,
      );
      if (!isOwner) {
        throw new ForbiddenException(['not authorized to import/export']);
      }

      const product = await this.productService.getById(productId);
      const importedWarehouse = await this.warehouseService.getByIdAsync(
        importedWarehouseId,
      );
      const correctType =
        importedWarehouse === null ||
        importedWarehouse.type === UNKNOWN ||
        product.type === importedWarehouse.type;

      if (!correctType) {
        throw new BadRequestException(['wrong product type']);
      }

      await this.validateFreeSpaceInImporter(
        importedWarehouseId,
        product.size,
        dto.productCount,
      );

      await this.validateProductCountInExporter(
        exportedWarehouseId,
        productId,
        dto.productCount,
      );

      const movement = await this.movementModel.create({ ...dto });

      if (importedWarehouse !== null && importedWarehouse.type === UNKNOWN) {
        await this.warehouseService.updateAsync(
          importedWarehouseId,
          customerId,
          {
            name: importedWarehouse.name,
            size: importedWarehouse.size,
            type: product.type,
          },
        );
      }
      return movement;
    } catch (error) {
      this.errorsService.throwException(error);
    }
  };

  getAllMovementsByWarehouseIdAsync = async (
    warehouseId: string,
  ): Promise<Movement[]> => {
    try {
      return this.movementModel.findAll({
        where: {
          [Op.or]: [
            { importedWarehouseId: warehouseId },
            { exportedWarehouseId: warehouseId },
          ],
        },
        attributes: [
          'productId',
          'productCount',
          'importedWarehouseId',
          'exportedWarehouseId',
          'date',
        ],
        include: [
          {
            model: Product,
            attributes: ['name', 'size', 'price'],
          },
          {
            model: Warehouse,
            as: 'importedWarehouse',
            attributes: ['name'],
          },
          {
            model: Warehouse,
            as: 'exportedWarehouse',
            attributes: ['name'],
          },
        ],
      });
    } catch (error) {
      this.errorsService.throwException(error);
    }
  };

  private customerIsOwner = async (
    customerId: string,
    importWarehouseId: string,
    exportWarehouseId: string,
  ): Promise<boolean> => {
    const customerWarehouses =
      await this.warehouseService.getAllByCustomerIdAsync(customerId);
    if (exportWarehouseId === null) {
      return customerWarehouses.some((x) => x.id === importWarehouseId);
    }
    if (importWarehouseId === null) {
      return customerWarehouses.some((x) => x.id === exportWarehouseId);
    }
    return (
      customerWarehouses.some((x) => x.id === importWarehouseId) &&
      customerWarehouses.some((x) => x.id === exportWarehouseId)
    );
  };

  private validateFreeSpaceInImporter = async (
    importedWarehouseId: string,
    productSize: number,
    count: number,
  ) => {
    if (!importedWarehouseId) return;
    const importedWarehouse = await this.warehouseService.getOneAsync(
      importedWarehouseId,
    );
    if (importedWarehouse.freeSpace < productSize * count) {
      throw new BadRequestException(['no space for this count']);
    }
  };

  private validateProductCountInExporter = async (
    exportedWarehouseId: string,
    productId: string,
    count: number,
  ) => {
    if (!exportedWarehouseId) return;
    const exportedWithProducts = await this.warehouseService.getOneDetailsAsync(
      exportedWarehouseId,
    );
    const productInExporter = exportedWithProducts.products.find(
      (x) => x.id === productId,
    );
    if (!productInExporter) {
      throw new BadRequestException(['no such product in exporter']);
    }
    if (productInExporter.count < count) {
      throw new BadRequestException(['not enough quantity to export']);
    }
  };
}
