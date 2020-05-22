import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@/auth/guards';
import { AuthService } from './auth/auth.service';
import { SourceMapConsumer } from 'source-map';
import * as argon2 from 'argon2';
import { aesDecrypt, aesEncrypt } from '@/utils/utils';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @Get()
  async getHello() {
    const key = 'flyeye';
    const encrypt = aesEncrypt(key); // 加密
    console.log(encrypt); // 998118c1207f9e6fa5ee610c5bfd8ef0

    const data = aesDecrypt('1aade23c045230cd9a367ae2c72ce07c'); // 解密
    console.log(data); // data
    return argon2.hash('111111');
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
