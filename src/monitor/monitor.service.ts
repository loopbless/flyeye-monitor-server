import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets, getManager } from 'typeorm';
import { MonitorEntity } from './monitor.entity';
import { MonitorDto, MonitorPageDto } from './monitor.model';
import { aesDecrypt } from '@/utils/utils';
import { AlarmService } from '@/alarm/alarm.service';

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(MonitorEntity)
    private readonly monitorRepository: Repository<MonitorEntity>,
    private alarm: AlarmService,
  ) {}

  async findAll({ offset, limit, appId, tags, currentUrl }: MonitorPageDto) {
    let builder = this.monitorRepository.createQueryBuilder('monitor');
    if (appId) {
      builder = builder.where('monitor.app_id = :appId', { appId });
    }

    if (currentUrl) {
      builder = builder.where('monitor.current_url = :currentUrl', {
        currentUrl,
      });
    }

    if (tags) {
      const tagList = tags.split(',');
      builder = builder.andWhere(
        new Brackets(qb => {
          let whereQb = null;
          tagList.forEach(tag => {
            if (whereQb) {
              whereQb = whereQb.orWhere('monitor.tags like `%:tags%`', { tag });
            } else {
              whereQb = qb.where('monitor.tags like `%:tags%`', { tag });
            }
          });
        }),
      );
    }

    return await builder
      .orderBy('monitor.create_at', 'DESC')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
  }

  async insert(monitor: MonitorDto) {
    try {
      const ids = aesDecrypt(monitor.appId).split(',');
      const entityManager = getManager();
      const monitorEntity = new MonitorEntity({
        ...monitor,
        app: { id: ids[0] },
        appVersion: { id: ids[1] },
      });
      this.alarmTrigger(ids[0], monitor);
      return await entityManager.save(monitorEntity);
    } catch (error) {
      return new HttpException('`appId` is error！', HttpStatus.BAD_REQUEST);
    }
  }

  async alarmTrigger(appId: number, monitor: MonitorDto) {
    const alarms = await this.alarm.findMany(appId);
    alarms.forEach(alarm => {
      const tags = alarm.dataTags.filter(tag => monitor.tags.includes(tag));
      if(tags.length > 0) {
        this.alarm.notify(alarm, {...monitor, appId} as any);
      }
    });
  }

  async count(appId: number) {
    this.monitorRepository
      .createQueryBuilder('monitor')
      .where('monitor.app_id=:appId', { appId })
      .groupBy('monitor.tags')
      .getCount();
  }
}
