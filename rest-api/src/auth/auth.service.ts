import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { SignupDto } from './dto';
import { Customer } from 'src/customers/customers.model';
import { hashPasswordAsync } from './helpers';

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
}
