import {
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { MovementDto } from './dto';
import { Movement } from './movements.model';
import { ProductsService } from 'src/products/products.service';
import { WarehousesService } from 'src/warehouses/warehouses.service';
import { UNKNOWN } from '../constants';
import { Product } from 'src/products/products.model';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement)
    private movementModel: typeof Movement,
    @Inject(forwardRef(() => WarehousesService))
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

    const product = await this.productService.getById(productId);
    const importedWarehouse = await this.warehouseService.getById(
      importedWarehouseId,
    );
    const correctType =
      importedWarehouse.type === UNKNOWN ||
      product.type === importedWarehouse.type;

    if (!correctType) {
      throw new ForbiddenException('wrong product type');
    }

    const movement = await this.movementModel.create({ ...dto });

    if (importedWarehouse.type === UNKNOWN) {
      await this.warehouseService.updateAsync(importedWarehouseId, customerId, {
        name: importedWarehouse.name,
        size: importedWarehouse.size,
        type: product.type,
      });
    }

    return movement;
  };

  getAllMovementsByWarehouseIdAsync = async (
    warehouseId: string,
  ): Promise<Movement[]> => {
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
      ],
    });
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
}
