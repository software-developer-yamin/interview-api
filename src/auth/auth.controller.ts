import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService, type SignupDto, type LoginDto } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    return this.authService.getMe(req.user.sub);
  }
}
