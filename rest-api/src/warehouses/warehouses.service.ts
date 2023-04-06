import { InjectModel } from '@nestjs/sequelize';
import {
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

import { CreateWarehouseDto } from './dto';
import { Warehouse } from './warehouses.model';
import { MathService } from 'src/math/math.service';
import { MovementsService } from 'src/movements/movements.service';

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
    dto: CreateWarehouseDto,
    customerId: string,
  ): Promise<Warehouse> => {
    return this.warehouseModel.create({
      ...dto,
      customerId,
    });
  };

  getAllByCustomerIdAsync = async (
    customerId: string,
  ): Promise<Warehouse[]> => {
    return this.warehouseModel.findAll({
      where: { customerId: customerId },
      attributes: ['id', 'name', 'size', 'type'],
    });
  };

  updateAsync = async (
    id: string,
    customerId: string,
    dto: CreateWarehouseDto,
  ): Promise<Warehouse> => {
    const warehouse = await this.warehouseModel.findByPk(id);
    if (warehouse.customerId != customerId) {
      throw new ForbiddenException('not authorized');
    }
    await this.warehouseModel.update(
      { ...dto },
      {
        where: { id: id },
      },
    );
    return this.warehouseModel.findByPk(id);
  };

  deleteByIdAsync = async (
    id: string,
    customerId: string,
  ): Promise<Warehouse> => {
    const warehouse = await this.warehouseModel.findByPk(id);
    if (warehouse.customerId != customerId) {
      throw new ForbiddenException('not authorized');
    }
    warehouse.destroy();
    return warehouse;
  };

  getById = async (id: string): Promise<Warehouse> => {
    return this.warehouseModel.findByPk(id);
  };

  private getFreeSpace = async (id: string): Promise<number> => {
    let expr = '';
    const warehouse = await this.getById(id);
    expr += warehouse.size;

    const movements =
      await this.movementsService.getAllMovementsByWarehouseIdAsync(id);

    expr = movements.reduce((acc, x) => {
      const operator = x.importedWarehouseId === id ? '-' : '+';
      acc = acc + operator + '(' + x.productCount + '*' + x.product.size + ')';
      return acc;
    }, expr);

    return this.mathService.calculateAsync(expr);
  };
}
