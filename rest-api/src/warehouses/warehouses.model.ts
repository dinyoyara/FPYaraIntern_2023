import {
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Length,
  Min,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { Customer } from '../customers/customers.model';
import {
  HAZARDOUS,
  NON_HAZARDOUS,
  UNKNOWN,
  WAREHOUSE_MIN_SIZE,
} from '../constants';
import { Movement } from 'src/movements/movements.model';

@Table
export class Warehouse extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Unique
  @Length({ min: 3 })
  @Column
  name: string;

  @Min(WAREHOUSE_MIN_SIZE)
  @Column({
    type: DataType.DOUBLE,
  })
  size: number;

  @Column({
    type: DataType.ENUM(HAZARDOUS, NON_HAZARDOUS, UNKNOWN),
    defaultValue: UNKNOWN,
  })
  type: string;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.UUID,
    references: {
      model: Customer,
      key: 'id',
    },
  })
  customerId: string;

  @DeletedAt
  @Column
  deletedAt?: Date;

  @BelongsTo(() => Customer)
  customer: Customer;

  @HasMany(() => Movement, 'exportedWarehouseId')
  exportedMovements: Movement[];

  @HasMany(() => Movement, 'importedWarehouseId')
  importedMovements: Movement[];
}
