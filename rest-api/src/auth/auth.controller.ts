import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignupDto, SigninDto, TokenDto } from './dto';
import { Customer } from 'src/customers/customers.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto): Promise<Customer> {
    return this.authService.signupAsync(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto): Promise<TokenDto> {
    return this.authService.signinAsync(dto);
  }
}
