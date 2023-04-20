import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Movement } from './movements.model';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { ProductsModule } from '../products/products.module';
import { ErrorsService } from 'src/errors/errors.service';

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
