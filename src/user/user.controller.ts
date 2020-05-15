import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@/auth/guards';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {

  constructor(private user: UserService) {
  }

  @Get('/current')
  async findMe(@Request() req) {
    const { password, ...user} = await this.user.findUserName(req.user.username);
    return user;
  }
}