import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@/auth/guards';
import { AuthService } from './auth/auth.service';
import { SourceMapConsumer } from 'source-map';
import * as argon2 from 'argon2';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @Get()
  async getHello() {
    return argon2.hash('111111');
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
