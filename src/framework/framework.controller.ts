import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards';
import { FrameworkService } from './framework.service';

@UseGuards(JwtAuthGuard)
@Controller('frameworks')
export class FrameworkController {
  constructor(private framework: FrameworkService) {}

  @Get()
  async findAll() {
    return await this.framework.findAll();
  }
}
