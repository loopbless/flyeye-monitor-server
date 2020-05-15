import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { MonitorEntity } from './monitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonitorEntity])],
  controllers: [MonitorController],
  providers: [MonitorService],
  exports: [MonitorService]
})
export class MonitorModule {}
