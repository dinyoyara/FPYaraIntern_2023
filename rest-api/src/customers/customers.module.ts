import { Module } from '@nestjs/common';

import { Customer } from './customers.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Customer])],
})
export class CustomersModule {}
