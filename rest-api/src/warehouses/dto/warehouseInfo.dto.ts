import { CreateWarehouseDto } from './warehouse.dto';

export class WarehouseInfoDto extends CreateWarehouseDto {
  id: string;
  freeSpace: number;
}
