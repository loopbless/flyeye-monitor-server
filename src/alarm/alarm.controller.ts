import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards';

@UseGuards(JwtAuthGuard)
@Controller()
export class AlarmController {

}