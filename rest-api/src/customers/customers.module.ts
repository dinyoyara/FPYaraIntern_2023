import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './customers.model';

@Module({
  imports: [SequelizeModule.forFeature([Customer])],
})
export class CustomersModule {}
