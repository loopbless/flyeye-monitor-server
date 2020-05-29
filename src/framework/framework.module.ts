import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrameworkEntity } from './framework.entity';
import { FrameworkController } from './framework.controller';
import { FrameworkService } from './framework.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FrameworkEntity]),
  ],
  controllers: [FrameworkController],
  providers: [FrameworkService],
  exports: [FrameworkService],
})
export class FrameworkModule {}
