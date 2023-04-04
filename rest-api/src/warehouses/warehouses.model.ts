import {
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Customer } from '../customers/customers.model';
import { HAZARDOUS, NON_HAZARDOUS, UNKNOWN } from '../constants';

@Table
export class Warehouse extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  name: string;

  @Column({
    validate: {
      min: 10,
    },
  })
  size: number;

  @Column({
    type: DataType.ENUM(HAZARDOUS, NON_HAZARDOUS, UNKNOWN),
    defaultValue: UNKNOWN,
  })
  type: string;

  @DeletedAt
  @Column
  deletedAt?: Date;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.UUID,
    references: {
      model: Customer,
      key: 'id',
    },
  })
  customerId: string;

  @BelongsTo(() => Customer)
  customer: Customer;
}
