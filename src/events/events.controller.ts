import { Controller, Post, Get, Body, UseGuards, Req, Res, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsDto } from './events.model';
import { JwtAuthGuard } from '@/auth/guards';

@Controller('events')
export class EventsController {

  constructor(private events: EventsService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findAll(@Req() req, @Res() res) {
    const data = await this.events.findAll(req.query);
    res.setHeader('X-total-count', data[1]);
    res.send(data[0]);
  }

  @Post('')
  async insert(@Body() eventsDto: EventsDto, @Req() req, @Res() res) {
    eventsDto.location = req.ip;
    eventsDto.userAgent = req.headers['user-agent'];
    eventsDto.data = JSON.parse(eventsDto.data)
    await this.events.insert(eventsDto);
    res.end();
  }

  @Get('apps/:appId')
  async count(@Param() appId: number) {
    await this.events.count(appId);
  }
}