import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Customer } from 'src/customers/customers.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Customer]), JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
