import { SequelizeModule } from '@nestjs/sequelize';

import { Module } from '@nestjs/common';
import { Warehouse } from './warehouses.model';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';

@Module({
  imports: [SequelizeModule.forFeature([Warehouse])],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}
