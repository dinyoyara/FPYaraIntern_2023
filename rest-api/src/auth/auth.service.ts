import { ForbiddenException, Injectable } from '@nestjs/common';
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

  async createCustomerAsync(dto: SignupDto): Promise<Customer> {
    const customer = await this.customerModel.create({
      name: dto.name,
      password: await hashPasswordAsync(dto.password),
      email: dto.email,
    });

    delete customer.dataValues.password;
    delete customer.dataValues.deletedAt;
    delete customer.dataValues.updatedAt;
    return customer;
  }

  async loginAsync(dto: SigninDto): Promise<TokenDto> {
    const customer = await this.customerModel.findOne({
      where: { email: dto.email },
    });
    if (!customer) throw new ForbiddenException('Email incorrect');

    const correctPassword = await verifyPasswordAsync(
      dto.password,
      customer.password,
    );
    if (!correctPassword) throw new ForbiddenException('Password incorrect');
    return this.signTokenAsync(customer.id);
  }

  private async signTokenAsync(id: string): Promise<TokenDto> {
    const payload = {
      id: id,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '120m',
      secret: secret,
    });

    return { token: token };
  }
}
