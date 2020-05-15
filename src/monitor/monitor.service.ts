import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { MonitorEntity } from './monitor.entity';
import { MonitorDto, MonitorPageDto } from './monitor.model';

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(MonitorEntity)
    private readonly monitorRepository: Repository<MonitorEntity>
  ) {}

  async findAll({offset, limit, appId, tags, currentUrl}: MonitorPageDto) {

    let builder = this.monitorRepository.createQueryBuilder('monitor');
    if(appId) {
      builder = builder.where('monitor.app_id = :appId', { appId });
    }

    if(currentUrl) {
      builder = builder.where('monitor.current_url = :currentUrl', { currentUrl });
    }

    if(tags) {
      const tagList = tags.split(',');
      builder = builder.andWhere(new Brackets(qb => {
        let whereQb = null;
        tagList.forEach(tag => {
          if(whereQb) {
            whereQb = whereQb.orWhere('monitor.tags like `%:tags%`', { tag });
          } else {
            whereQb = qb.where('monitor.tags like `%:tags%`', { tag });
          }
        })
      }))
    }

    return await builder.orderBy('monitor.create_at', 'DESC')
    .offset(offset)
    .limit(limit)
    .getManyAndCount();
    
  }

  async insert(monitor: MonitorDto) {
    return await this.monitorRepository.insert(new MonitorEntity(monitor));
  }
}