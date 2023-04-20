import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Customer } from 'src/customers/customers.model';
import { JwtStrategy } from './strategy';
import { ErrorsService } from 'src/errors/errors.service';

@Module({
  imports: [SequelizeModule.forFeature([Customer]), JwtModule],
  providers: [AuthService, ErrorsService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
