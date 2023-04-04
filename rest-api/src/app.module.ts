import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';

import { Customer } from './customers/customers.model';
import { CustomersModule } from './customers/customers.module';
import { WarehousesModule } from './warehouses/warehouses.module';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      models: [Customer],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomersModule,
    WarehousesModule,
  ],
})
export class AppModule {}
