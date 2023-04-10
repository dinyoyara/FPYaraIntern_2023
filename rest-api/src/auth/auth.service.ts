import {
  ForbiddenException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

import { SigninDto, SignupDto, TokenDto } from './dto';
import { Customer } from 'src/customers/customers.model';
import { hashPasswordAsync, verifyPasswordAsync } from './helpers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  createCustomerAsync = async (dto: SignupDto): Promise<Customer> => {
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
      throw new BadRequestException(error.errors[0].message);
    }
  };

  loginAsync = async (dto: SigninDto): Promise<TokenDto> => {
    const customer = await this.customerModel.findOne({
      where: { email: dto.email },
    });
    if (!customer) throw new ForbiddenException('Email incorrect');

    const correctPassword = await verifyPasswordAsync(
      dto.password,
      customer.password,
    );
    if (!correctPassword) throw new ForbiddenException('Password incorrect');
    return this.signTokenAsync(customer.id, customer.email, customer.name);
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
      expiresIn: '120m',
      secret: secret,
    });

    return { token: token };
  };
}
