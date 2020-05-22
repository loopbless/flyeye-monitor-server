import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, AfterLoad} from 'typeorm';
import { MonitorType } from './monitor.enum';
import { VersionEntity } from '@/version/version.entity';
import { aesDecrypt } from '@/utils/utils';
import * as UAParser from 'ua-parser-js';
import { ApplicationEntity } from '@/application/application.entity';


@Entity('monitor')
export class MonitorEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 20, comment: '上报时间'})
  timestamp: string;

  @Column({comment: '语言环境信息'})
  platform: string;

  @Column({name: 'user_agent', comment: '运行环境信息'})
  userAgent: string;

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

  @AfterLoad()
  handle() {
    const parser = new UAParser();
    parser.setUA(this.userAgent);
    this.userAgent = parser.getResult();
  }

  @Column({default: 0, comment: '处理状态'})
  status: number;

  @ManyToOne(() => VersionEntity, version => version.monitors)
  @JoinColumn({ name: 'app_version_id' })
  appVersion: VersionEntity; // 数据对应app版本ID

  @ManyToOne(() => ApplicationEntity, app => app.monitors)
  @JoinColumn({ name: 'app_id' })
  app: ApplicationEntity; // 数据对应app版本ID

  constructor(data: any) {
    if(data) {
      this.appVersion = data.appVersion;
      this.app = data.app;
      this.timestamp = data.timestamp;
      this.platform = data.platform;
      this.userAgent = data.userAgent;
      this.currentUrl = data.currentUrl;
      this.fromUrl = data.fromUrl;
      if(data.accountData) {
        this.accountData = JSON.parse(data.accountData);
      }
      if(data.type) {
        this.type = data.type;
      }
      this.tags = data.tags;
      this.location = data.location;
      this.data = data.data;
    }
  }
}