import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from './auth/auth.module';
import { MathModule } from './math/math.module';
import { ErrorsModule } from './errors/errors.module';
import databaseConfig from './database/database.config';
import { ProductsModule } from './products/products.module';
import { MovementsModule } from './movements/movements.module';
import { CustomersModule } from './customers/customers.module';
import { WarehousesModule } from './warehouses/warehouses.module';

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
    AuthModule,
    MathModule,
    ErrorsModule,
  ],
})
export class AppModule {}
