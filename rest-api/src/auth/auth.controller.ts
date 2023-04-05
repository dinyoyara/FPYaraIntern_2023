import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Customer } from 'src/customers/customers.model';
import { SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto): Promise<Customer> {
    return this.authService.createCustomerAsync(dto);
  }
}