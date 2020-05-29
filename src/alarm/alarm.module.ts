import { Module } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmController } from './alarm.controller';
import { AlarmEntity } from './alarm.entity';
import { NotifyCacheService } from './notify.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity])],
  controllers: [AlarmController],
  providers: [AlarmService, NotifyCacheService],
  exports: [AlarmService]
})
export class AlarmModule {
}