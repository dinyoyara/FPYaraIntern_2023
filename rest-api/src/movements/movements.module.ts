import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';

import { Movement } from './movements.model';
import { MovementsService } from './movements.service';
import { ErrorsService } from '../errors/errors.service';
import { ProductsModule } from '../products/products.module';
import { MovementsController } from './movements.controller';
import { WarehousesModule } from '../warehouses/warehouses.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Movement]),
    forwardRef(() => WarehousesModule),
    ProductsModule,
  ],
  providers: [MovementsService, ErrorsService],
  controllers: [MovementsController],
  exports: [MovementsService],
})
export class MovementsModule {}
