import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets, getManager } from 'typeorm';
import { EventsEntity } from './events.entity';
import { EventsDto, EventsPageDto } from './events.model';
import { aesDecrypt } from '@/utils/utils';
import { AlarmService } from '@/alarm/alarm.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsEntity)
    private readonly eventsRepository: Repository<EventsEntity>,
    private alarm: AlarmService,
  ) {}

  async findAll({ offset, limit, appId, tags, currentUrl }: EventsPageDto) {
    let builder = this.eventsRepository.createQueryBuilder('events');
    if (appId) {
      builder = builder.where('events.app_id = :appId', { appId });
    }

    if (currentUrl) {
      builder = builder.where('events.current_url = :currentUrl', {
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
              whereQb = whereQb.orWhere('events.tags like `%:tags%`', { tag });
            } else {
              whereQb = qb.where('events.tags like `%:tags%`', { tag });
            }
          });
        }),
      );
    }

    return await builder
      .orderBy('events.create_at', 'DESC')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
  }

  async insert(events: EventsDto) {
    try {
      const ids = aesDecrypt(events.appId).split(',');
      const entityManager = getManager();
      const eventsEntity = new EventsEntity({
        ...events,
        app: { id: ids[0] },
        appVersion: { id: ids[1] },
      });
      this.alarmTrigger(ids[0], events);
      return await entityManager.save(eventsEntity);
    } catch (error) {
      return new HttpException('`appId` is error！', HttpStatus.BAD_REQUEST);
    }
  }

  async alarmTrigger(appId: number, events: EventsDto) {
    const alarms = await this.alarm.findMany(appId);
    alarms.forEach(alarm => {
      const tags = alarm.dataTags.filter(tag => events.tags.includes(tag));
      if(tags.length > 0) {
        this.alarm.notify(alarm, {...events, appId} as any);
      }
    });
  }

  async count(appId: number) {
    this.eventsRepository
      .createQueryBuilder('events')
      .where('events.app_id=:appId', { appId })
      .groupBy('events.tags')
      .getCount();
  }
}
