import {
  Min,
  Model,
  Table,
  Length,
  Column,
  Unique,
  HasMany,
  DataType,
  AllowNull,
  PrimaryKey,
} from 'sequelize-typescript';

import {
  HAZARDOUS,
  NON_HAZARDOUS,
  NAME_MIN_LENGTH,
  PRODUCT_MIN_SIZE,
  PRODUCT_MIN_PRICE,
} from '../constants';
import { Movement } from '../movements/movements.model';

@Table
export class Product extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Unique
  @Length({ min: NAME_MIN_LENGTH })
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

  @HasMany(() => Movement)
  movements: Movement[];
}
