import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Min,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { Warehouse } from 'src/warehouses/warehouses.model';

@Table
export class Movement extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Min(1)
  @Column
  productCount: number;

  @Column
  date: Date;

  @ForeignKey(() => Warehouse)
  @Column({
    type: DataType.UUID,
    references: {
      model: Warehouse,
      key: 'id',
    },
    onDelete: 'SET NULL',
  })
  exportedWarehouseId: string;

  @BelongsTo(() => Warehouse, 'exportedWarehouseId')
  exportedWarehouse: Warehouse;

  @ForeignKey(() => Warehouse)
  @Column({
    type: DataType.UUID,
    references: {
      model: Warehouse,
      key: 'id',
    },
    onDelete: 'SET NULL',
  })
  importedWarehouseId: string;

  @BelongsTo(() => Warehouse, 'importedWarehouseId')
  importedWarehouse: Warehouse;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    references: {
      model: Product,
      key: 'id',
    },
  })
  productId: string;

  @BelongsTo(() => Product)
  product: Product;
}
