import { WarehouseInfoDto } from './warehouseInfo.dto';
import { ProductInfoModel } from 'src/products/models';

export interface WarehouseWithProductDto extends WarehouseInfoDto {
  products: ProductInfoModel[];
}
