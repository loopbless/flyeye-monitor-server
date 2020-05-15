import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { VersionEntity } from '@/version/version.entity';
import { UserEntity } from '@/user/user.entity';
import { AlarmEntity } from '@/alarm/alarm.entity';

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

  @Column({ name: 'app_token'})
  appToken: string;

  @BeforeInsert()
  generateToken() {
    this.appToken = '';
  }

  @OneToMany(() => VersionEntity, version => version.application)
  versions: VersionEntity[];

  @OneToMany(() => AlarmEntity, version => version.app)
  alarms: AlarmEntity[];
}