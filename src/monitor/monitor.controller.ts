import { Controller, Post, Get, Body, UseGuards, Req, Res } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorDto } from './monitor.model';
import { JwtAuthGuard } from '@/auth/guards';

@UseGuards(JwtAuthGuard)
@Controller('monitors')
export class MonitorController {

  constructor(private monitor: MonitorService) {
  }

  @Get('')
  async findAll(@Req() req, @Res() res) {
    const data = await this.monitor.findAll(req.query);
    res.setHeader('X-total-count', data[1]);
    res.send(data[0]);
  }

  @Post('/')
  async insert(@Body('monitor') monitorDto: MonitorDto) {
    return await this.monitor.insert(monitorDto);
  }
}