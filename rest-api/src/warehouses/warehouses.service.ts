import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Warehouse } from './warehouses.model';
import { CreateWarehouseDto } from './dto';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectModel(Warehouse)
    private warehouseModel: typeof Warehouse,
  ) {}

  createAsync = async (
    dto: CreateWarehouseDto,
    customerId: string,
  ): Promise<Warehouse> => {
    return this.warehouseModel.create({
      name: dto.name,
      size: dto.size,
      type: dto.type,
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
    dto: CreateWarehouseDto,
  ): Promise<Warehouse> => {
    await this.warehouseModel.update(
      {
        name: dto.name,
        size: dto.size,
        type: dto.type,
      },
      {
        where: { id: id },
      },
    );
    return this.warehouseModel.findByPk(id);
  };

  deleteByIdAsync = async (id: string): Promise<Warehouse> => {
    const warehouse = await this.warehouseModel.findByPk(id);
    warehouse.destroy();
    return warehouse;
  };
}