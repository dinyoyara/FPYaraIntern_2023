import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Customer } from 'src/customers/customers.model';
import { JwtStrategy } from './strategy';

@Module({
  imports: [SequelizeModule.forFeature([Customer]), JwtModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
