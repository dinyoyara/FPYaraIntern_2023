import {
  AllowNull,
  Column,
  DataType,
  DeletedAt,
  HasMany,
  IsEmail,
  Length,
  Model,
  NotNull,
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

  @Length({ min: 2 })
  @Column({
    allowNull: false,
  })
  name: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Length({ min: 4 })
  @Column({
    allowNull: false,
  })
  password: string;

  @DeletedAt
  @Column
  deletedAt?: Date;

  @HasMany(() => Warehouse)
  warehouse: Warehouse[];
}
