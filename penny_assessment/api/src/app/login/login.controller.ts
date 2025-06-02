import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

export class SignupDto {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export class SigninDto {
  username: string;
  password: string;
}

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.loginService.signup(signupDto);
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    const user = await this.loginService.signin(
      signinDto.username,
      signinDto.password
    );
    return user;
  }
}
