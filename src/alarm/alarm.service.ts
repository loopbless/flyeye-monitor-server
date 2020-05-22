import { Injectable } from '@nestjs/common';
import { Repository, getManager, AdvancedConsoleLogger } from 'typeorm';
import { AlarmEntity } from './alarm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AlarmDto, AlarmPageDto } from './alarm.modal';
import { MonitorEntity } from '@/monitor/monitor.entity';
import { DingdingBot } from '@/utils/dingdingbot.util';
import { NotifyCacheService } from './notify.service';
import * as ejs from 'ejs';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
    private notifyCache: NotifyCacheService,
  ) {
    notifyCache.subscribe(msgs => {
      this.submitNotify(msgs);
    });
  }

  private submitNotify(msgs: any[]) {
    const webhookMsgs = [];
    const emailMsgs = [];
    msgs.forEach(msg => {
      if (msg.mode === 'email') {
        emailMsgs.push(msg);
      } else if (msg.mode === 'webhook') {
        webhookMsgs.push(msg);
      }
    });
    if(emailMsgs.length > 0) {
      this.notifyEmail(emailMsgs);
    }
    if(webhookMsgs.length > 0) {
      this.notifyWebhook(webhookMsgs);
    }
  }

  async findAll({ offset, limit, appId }: AlarmPageDto) {
    return await this.alarmRepository
      .createQueryBuilder()
      .where('app_id=:appId', { appId })
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
  }

  async findMany(appId: number) {
    return await this.alarmRepository
      .createQueryBuilder()
      .where('app_id=:appId', { appId })
      .getMany();
  }

  async save(alarm: AlarmDto) {
    const entityManager = getManager();
    const alarmEntity = new AlarmEntity();
    if (alarm.id) {
      alarmEntity.id = alarm.id;
    }
    alarmEntity.mode = alarm.mode;
    alarmEntity.target = alarm.target;
    alarmEntity.template = alarm.template;
    alarmEntity.dataType = alarm.dataType;
    alarmEntity.dataTags = alarm.dataTags;
    alarmEntity.user = alarm.user;
    return await entityManager.save(alarmEntity);
  }

  notify(alarm: AlarmEntity, data: MonitorEntity) {
    this.notifyCache.push({ ...alarm, content: data });
  }

  private notifyWebhook(msgs: any[]) {
    const msgsMap = new Map<string, any>();
    msgs.forEach(msg => {
      if(msgsMap.has(msg.target)) {
        const msgItems = msgsMap.get(msg.target);
        msgItems.push(msg);
        msgsMap.set(msg.target, msgItems);
      } else {
        msgsMap.set(msg.target, [msg]);
      }
    });
    Array.from(msgsMap.values()).forEach(list => {
      const bot = new DingdingBot(list[0].target);
      const item = list[0];
      const data = list.map(item => item.content.data)
      let content = ejs.render(item.template.replace(/\s/g, ''), {...item.content, data: JSON.stringify(data, null, 2)}).replace(/\n/g, '@').replace(/\s/g, '%');
      try {
        content = JSON.parse(content, (k, v) => {
          if(typeof v === 'string' && v.includes('&#34;')) {
            return v.replace(/&#34;/g, '"').replace(/@/g, '\n').replace(/%/g, ' ');
          }
          return v;
        });
      } catch (e) {}
      bot.pushMsg(content);
    });
  }

  private notifyEmail(data: any) {
    console.log(data.target, data);
  }
}
