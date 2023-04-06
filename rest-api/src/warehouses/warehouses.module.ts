import { SequelizeModule } from '@nestjs/sequelize';

import { Module, forwardRef } from '@nestjs/common';
import { Warehouse } from './warehouses.model';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { HttpModule } from '@nestjs/axios';
import { MathService } from 'src/math/math.service';
import { MovementsModule } from 'src/movements/movements.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Warehouse]),
    forwardRef(() => MovementsModule),
    HttpModule,
  ],
  controllers: [WarehousesController],
  providers: [WarehousesService, MathService],
  exports: [WarehousesService],
})
export class WarehousesModule {}
