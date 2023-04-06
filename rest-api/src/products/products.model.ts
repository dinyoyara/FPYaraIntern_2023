import {
  Column,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Min,
  AllowNull,
  Length,
  Unique,
} from 'sequelize-typescript';

import {
  PRODUCT_MIN_SIZE,
  PRODUCT_MIN_PRICE,
  HAZARDOUS,
  NON_HAZARDOUS,
} from '../constants';
import { Movement } from 'src/movements/movements.model';

@Table
export class Product extends Model {
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

  @Min(PRODUCT_MIN_PRICE)
  @Column({
    type: DataType.DOUBLE,
  })
  price: number;

  @Min(PRODUCT_MIN_SIZE)
  @Column({
    type: DataType.DOUBLE,
  })
  size: number;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(HAZARDOUS, NON_HAZARDOUS),
  })
  type: string;

  @DeletedAt
  @Column
  deletedAt?: Date;

  @HasMany(() => Movement)
  movements: Movement[];
}
