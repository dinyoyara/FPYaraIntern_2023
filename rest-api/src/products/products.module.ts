import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Product } from './products.model';
import { ProductsService } from './products.service';
import { ErrorsService } from '../errors/errors.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ErrorsService],
  exports: [ProductsService],
})
export class ProductsModule {}
