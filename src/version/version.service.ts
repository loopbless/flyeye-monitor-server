import { Injectable } from '@nestjs/common';
import { VersionEntity } from './version.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(VersionEntity)
    private readonly appVersionRepository: Repository<VersionEntity>) {}
    

  async findByAppId(id: number) {
    return await this.appVersionRepository
    .createQueryBuilder('version')
    .leftJoinAndSelect('version.application', 'app')
    .where('version.app_id = :id', {id})
    .orderBy('version.create_at', 'DESC')
    .getOne();
  }

  async create(source: string) {
    const result = await this.appVersionRepository.insert({sourceMapPath: source});
    return result.identifiers[0];
  }

  async update(id: number, source: string) {
    return await this.appVersionRepository
    .createQueryBuilder()
    .update(VersionEntity)
    .set({ sourceMapPath: source })
    .where('id = :id', { id })
    .execute();
  }
}