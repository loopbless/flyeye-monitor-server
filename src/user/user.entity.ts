import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { ApplicationEntity } from '@/application/application.entity';
import { AlarmEntity } from '@/alarm/alarm.entity';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  username: string;

  @Column({ length: 50, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true, length: 15, unique: true })
  mobile: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  password: string;

  @Column({ name: 'create_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
  createAt: Date;

  @Column({ default: 1, comment: '用户状态 0禁用；1启用' })
  status: number;

  @OneToMany(() => ApplicationEntity, app => app.user)
  apps: ApplicationEntity[];

  @OneToMany(() => AlarmEntity, webhook => webhook.user)
  alarms: AlarmEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  constructor(data: any) {
    if (data) {
      this.username = data.username;
      this.email = data.email;
      this.mobile = data.mobile;
      this.avatar = data.avatar;
      this.password = data.password;
    }
  }
}
