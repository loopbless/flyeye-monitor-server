import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionEntity } from './version.entity';
import { VersionService } from './version.service';

@Module({
  imports: [TypeOrmModule.forFeature([VersionEntity])],
  controllers: [],
  providers: [VersionService],
  exports: [VersionService]
})
export class VersionModule {}
