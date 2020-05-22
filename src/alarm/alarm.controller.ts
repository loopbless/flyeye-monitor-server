import { Controller, UseGuards, Body, Post, Req, Get, Res, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards';
import { AlarmDto } from './alarm.modal';
import { AlarmService } from './alarm.service';

@UseGuards(JwtAuthGuard)
@Controller('alarms')
export class AlarmController {

  constructor(private alarmService: AlarmService) {}

  @Post()
  async insert(@Body() alarm: AlarmDto, @Req() req, @Res() res) {
    alarm.user = req.user;
    await this.alarmService.save(alarm);
    res.end();
  }

  @Patch()
  async updae(@Body() alarm: AlarmDto, @Req() req, @Res() res) {
    alarm.user = req.user;
    await this.alarmService.save(alarm);
    res.end();
  }

  @Get()
  async findAll(@Req() req, @Res() res) {
    const data = await this.alarmService.findAll(req.query);
    res.setHeader('X-total-count', data[1]);
    res.send(data[0]);
  }
}