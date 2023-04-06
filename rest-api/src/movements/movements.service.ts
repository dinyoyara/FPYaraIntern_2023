import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { MovementDto } from './dto';
import { Movement } from './movements.model';
import { ProductsService } from 'src/products/products.service';
import { WarehousesService } from 'src/warehouses/warehouses.service';
import { UNKNOWN } from '../constants';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement)
    private movementModel: typeof Movement,
    private warehouseService: WarehousesService,
    private productService: ProductsService,
  ) {}

  createMovement = async (
    dto: MovementDto,
    customerId: string,
  ): Promise<Movement> => {
    const { importedWarehouseId, exportedWarehouseId, productId } = dto;
    const isOwner = await this.customerIsOwner(
      customerId,
      importedWarehouseId,
      exportedWarehouseId,
    );
    if (!isOwner) {
      throw new ForbiddenException('not authorized');
    }
    const correctProductType = await this.correctProductType(
      productId,
      importedWarehouseId,
    );
    if (!correctProductType) {
      throw new ForbiddenException('wrong product type');
    }
    return this.movementModel.create({ ...dto });
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
    return (
      customerWarehouses.some((x) => x.id === importWarehouseId) &&
      customerWarehouses.some((x) => x.id === exportWarehouseId)
    );
  };

  private correctProductType = async (
    productId: string,
    importedWarehouseId: string,
  ): Promise<boolean> => {
    const product = await this.productService.getById(productId);
    const warehouse = await this.warehouseService.getById(importedWarehouseId);
    return warehouse.type === UNKNOWN || product.type === warehouse.type;
  };
}
