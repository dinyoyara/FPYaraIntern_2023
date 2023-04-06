import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Movement } from './movements.model';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { WarehousesModule } from 'src/warehouses/warehouses.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Movement]),
    WarehousesModule,
    ProductsModule,
  ],
  providers: [MovementsService],
  controllers: [MovementsController],
})
export class MovementsModule {}
