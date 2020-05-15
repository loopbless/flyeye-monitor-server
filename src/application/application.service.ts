import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { AppDto } from './application.modal';
import { VersionService } from '@/version/version.service';
import { PageDto } from '@/common/page.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly appRepository: Repository<ApplicationEntity>,
    private version: VersionService
  ) {}

  async findAll({offset, limit}: PageDto) {
    return await this.appRepository
    .createQueryBuilder()
    .orderBy('create_at', 'DESC')
    .offset(offset)
    .limit(limit)
    .getManyAndCount();
  }

  async find(id: number) {
    return await this.appRepository
    .createQueryBuilder('app')
    .leftJoinAndSelect('app.versions', 'version')
    .where('app.id = :id', {id})
    .orderBy('version.create_at', 'DESC')
    .getOne();
  }

  async insert(app: AppDto) {
    const version = await this.version.create(app.sourceMapPath);
    return await this.appRepository.insert({name: app.name, version} as any);
  }
}