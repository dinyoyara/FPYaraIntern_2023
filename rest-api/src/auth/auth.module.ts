import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { JwtStrategy } from './strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Customer } from 'src/customers/customers.model';
import { ErrorsService } from 'src/errors/errors.service';

@Module({
  imports: [SequelizeModule.forFeature([Customer]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService, ErrorsService, JwtStrategy],
})
export class AuthModule {}
