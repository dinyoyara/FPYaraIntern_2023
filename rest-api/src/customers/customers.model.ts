import {
  Column,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Warehouse } from 'src/warehouses/warehouses.model';

@Table
export class Customer extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @DeletedAt
  @Column
  deletedAt?: Date;

  @HasMany(() => Warehouse)
  warehouse: Warehouse[];
}
