import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsEntity } from './events.entity';
import { AlarmModule } from '@/alarm/alarm.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity]), AlarmModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
