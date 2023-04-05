import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Customer } from 'src/customers/customers.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
  ) {}
}
