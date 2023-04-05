import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import databaseConfig from './database/database.config';
import { CustomersModule } from './customers/customers.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { ProductsModule } from './products/products.module';
import { MovementsModule } from './movements/movements.module';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomersModule,
    WarehousesModule,
    ProductsModule,
    MovementsModule,
  ],
})
export class AppModule {}
