import { IsEmail, Length } from 'class-validator';

export class SignupDto {
  @Length(2)
  name: string;

  @IsEmail()
  email: string;

  @Length(5)
  password: string;
}
