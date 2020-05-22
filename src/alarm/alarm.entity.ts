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

  @Column({ comment: '报警方式' })
  mode: string;

  @Column({ comment: '报警源' })
  target: string;

  @Column({name: 'data_type', default: MonitorType.ERROR, comment: '数据类型' })
  dataType: MonitorType;

  @Column('simple-array', {name: 'data_tags', comment: '数据标签' })
  dataTags: string[];

  @Column('text', { comment: '模板' })
  template: string;

  @Column('tinyint', { default: 1, comment: '0 未开启；1 已开启' })
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
