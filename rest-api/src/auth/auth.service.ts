import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Injectable, BadRequestException } from '@nestjs/common';

import { SigninDto, SignupDto, TokenDto } from './dto';
import { Customer } from '../customers/customers.model';
import { ErrorsService } from '../errors/errors.service';
import { hashPasswordAsync, verifyPasswordAsync } from './helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
    private jwt: JwtService,
    private config: ConfigService,
    private errorsService: ErrorsService,
  ) {}

  signupAsync = async (dto: SignupDto): Promise<Customer> => {
    try {
      const customer = await this.customerModel.create({
        ...dto,
        password: await hashPasswordAsync(dto.password),
      });

      delete customer.dataValues.password;
      delete customer.dataValues.deletedAt;
      delete customer.dataValues.updatedAt;
      return customer;
    } catch (error) {
      this.errorsService.throwException(error);
    }
  };

  signinAsync = async (dto: SigninDto): Promise<TokenDto> => {
    try {
      const customer = await this.customerModel.findOne({
        where: { email: dto.email },
      });
      if (!customer) throw new BadRequestException(['email incorrect']);

      const correctPassword = await verifyPasswordAsync(
        dto.password,
        customer.password,
      );
      if (!correctPassword)
        throw new BadRequestException(['password incorrect']);
      return this.signTokenAsync(customer.id, customer.email, customer.name);
    } catch (error) {
      this.errorsService.throwException(error);
    }
  };

  private signTokenAsync = async (
    id: string,
    email: string,
    name: string,
  ): Promise<TokenDto> => {
    const payload = {
      id,
      email,
      name,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: secret,
    });

    return { token: token };
  };
}
