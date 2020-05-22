import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { MonitorEntity } from './monitor.entity';
import { WebhookModule } from '@/alarm/alarm.module';

@Module({
  imports: [TypeOrmModule.forFeature([MonitorEntity]), WebhookModule],
  controllers: [MonitorController],
  providers: [MonitorService],
  exports: [MonitorService]
})
export class MonitorModule {}
