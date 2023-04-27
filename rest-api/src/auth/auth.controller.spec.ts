import { Test, TestingModule } from '@nestjs/testing';

import { SignupDto, TokenDto } from './dto';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Customer } from '../customers/customers.model';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    const customers: Customer[] = [];
    fakeAuthService = {
      signupAsync: () => {
        const customer = { id: 'asdf' } as Customer;
        customers.push(customer);
        return Promise.resolve(customer);
      },
      signinAsync: () => {
        return Promise.resolve({ token: 'token' } as TokenDto);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be define', () => {
    expect(controller).toBeDefined();
  });

  it('create new user', async () => {
    const customer = await controller.signup({} as SignupDto);
    expect(customer.id).toEqual('asdf');
  });

  it('singin return token', async () => {
    const token = await controller.signin({} as SignupDto);
    expect(token).toBeDefined();
  });
});
