import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { SigninDto, SignupDto } from './dto';
import { Customer } from 'src/customers/customers.model';
import { hashPasswordAsync, verifyPasswordAsync } from './helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
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

  async loginAsync(dto: SigninDto): Promise<string> {
    const customer = await this.customerModel.findOne({
      where: { email: dto.email },
    });
    if (!customer) throw new ForbiddenException('Email incorrect');

    const correctPassword = await verifyPasswordAsync(
      dto.password,
      customer.password,
    );
    if (!correctPassword) throw new ForbiddenException('Password incorrect');
    return customer.dataValues.email;
  }
}
