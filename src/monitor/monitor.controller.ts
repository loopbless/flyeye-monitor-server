import { Controller, Post, Get, Body, UseGuards, Req, Res, Param } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorDto } from './monitor.model';
import { JwtAuthGuard } from '@/auth/guards';

@Controller('monitors')
export class MonitorController {

  constructor(private monitor: MonitorService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findAll(@Req() req, @Res() res) {
    const data = await this.monitor.findAll(req.query);
    res.setHeader('X-total-count', data[1]);
    res.send(data[0]);
  }

  @Post('')
  async insert(@Body() monitorDto: MonitorDto, @Req() req, @Res() res) {
    monitorDto.location = req.ip;
    monitorDto.userAgent = req.headers['user-agent'];
    monitorDto.data = JSON.parse(monitorDto.data)
    await this.monitor.insert(monitorDto);
    res.end();
  }

  @Get('apps/:appId')
  async count(@Param() appId: number) {
    await this.monitor.count(appId);
  }
}