import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { VersionEntity } from '@/version/version.entity';
import { UserEntity } from '@/user/user.entity';
import { AlarmEntity } from '@/alarm/alarm.entity';
import { EventsEntity } from '@/events/events.entity';
import { FrameworkEntity } from '@/framework/framework.entity';

@Entity('application')
export class ApplicationEntity {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({length: 20, unique: true})
  name: string;
  
  @Column({ name: 'create_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间'})
  createAt: Date;
  
  @ManyToOne(() => UserEntity, user => user.apps)
  @JoinColumn({ name: 'create_by'})
  user: UserEntity;
  
  @OneToMany(() => VersionEntity, version => version.application)
  versions: VersionEntity[];

  @ManyToOne(() => FrameworkEntity, framework => framework.apps)
  @JoinColumn({ name: 'framework_id'})
  framework: FrameworkEntity;
  
  @OneToMany(() => AlarmEntity, alarm => alarm.app)
  alarms: AlarmEntity[];
  
  @OneToMany(() => EventsEntity, events => events.app)
  events: EventsEntity[];
  
}