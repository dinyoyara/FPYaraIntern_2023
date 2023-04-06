import { WarehouseDto } from './warehouse.dto';

export class WarehouseInfoDto extends WarehouseDto {
  id: string;
  freeSpace: number;
}
