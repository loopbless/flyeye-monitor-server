import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MonitorType } from '@/monitor/monitor.enum';
import { UserEntity } from '@/user/user.entity';
import { ApplicationEntity } from '@/application/application.entity';

@Entity('alarm')
export class AlarmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'alarm 标题' })
  title: string;

  @Column({ comment: '推送URL' })
  url: string;

  @Column({ default: MonitorType.ERROR, comment: '数据类型' })
  type: MonitorType;

  @Column('simple-array', { comment: '数据标签' })
  tags: string[];

  @Column('tinyint', { default: 0, comment: '0 未开启；1 已开启' })
  status: number;

  @Column({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  createAt: Date;

  @ManyToOne(
    () => UserEntity,
    user => user.apps,
  )
  @JoinColumn({ name: 'create_by' })
  user: UserEntity;

  @ManyToOne(
    () => ApplicationEntity,
    app => app.alarms,
  )
  @JoinColumn({ name: 'app_id' })
  app: ApplicationEntity;
}
