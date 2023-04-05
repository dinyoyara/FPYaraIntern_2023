import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Customer } from 'src/customers/customers.model';
import { SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
  ) {}

  async createCustomerAsync(dto: SignupDto): Promise<Customer> {
    const customer = await this.customerModel.create({
      name: dto.name,
      password: dto.password,
      email: dto.email,
    });

    delete customer.dataValues.password;
    delete customer.dataValues.deletedAt;
    delete customer.dataValues.updatedAt;

    return customer;
  }
}
