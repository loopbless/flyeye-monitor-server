import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { MonitorType } from './monitor.enum';
import { VersionEntity } from '@/version/version.entity';

@Entity('monitor')
export class MonitorEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 20, comment: '上报时间'})
  timestamp: string;

  @Column({comment: '运行环境信息'})
  agent: string;

  @Column({name: 'current_url', comment: '当前路径'})
  currentUrl: string;

  @Column({name: 'from_url', comment: '前一个地址'})
  fromUrl: string;

  @Column({name: 'account_data', length: 20, comment: '账户ID'})
  accountData: string;

  @Column({default: MonitorType.ERROR, comment: '数据类型'})
  type: MonitorType;

  @Column({ name: 'create_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间'})
  createAt: Date;

  @Column('simple-array', {comment: '数据标签'})
  tags: string[];

  @Column({nullable: true, comment: '设备地址'})
  location: string;

  @Column('simple-json', {comment: '数据信息'})
  data: any;

  @Column({default: 0, comment: '处理状态'})
  status: number;

  @ManyToOne(() => VersionEntity, version => version.monitors)
  @JoinColumn({ name: 'app_id' })
  appVersion: VersionEntity; // 数据对应app版本ID

  constructor(data: any) {
    if(data) {
      this.appVersion = {id: data.appId} as any;
      this.timestamp = data.timestamp;
      this.agent = data.agent;
      this.currentUrl = data.currentUrl;
      this.fromUrl = data.fromUrl;
      this.accountData = JSON.parse(data.accountData);
      if(data.type) {
        this.type = data.type;
      }
      this.tags = data.tags;
      this.location = data.location;
      this.data = data.data;
    }
  }
}