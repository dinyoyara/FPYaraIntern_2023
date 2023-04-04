import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';

import { Customer } from '../customers/customers.model';
import { Warehouse } from '../warehouses/warehouses.model';

dotenv.config();

const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  autoLoadModels: true,
  synchronize: true,
  models: [Customer, Warehouse],
};

export default databaseConfig;
