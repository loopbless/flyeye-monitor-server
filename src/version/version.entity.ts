import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { ApplicationEntity } from '@/application/application.entity';
import { MonitorEntity } from '@/monitor/monitor.entity';

@Entity('version')
export class VersionEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'source_map_path', comment: 'SourceMap 文件地址', nullable: false})
  sourceMapPath: string;

  @Column('simple-array', {comment: '版本标签'})
  tags: string[];

  @Column({ name: 'create_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间'})
  createAt: Date;

  @ManyToOne(() => ApplicationEntity, app => app.versions)
  @JoinColumn({ name: 'app_id' })
  application: ApplicationEntity;

  @OneToMany(() => MonitorEntity, monitor => monitor.appVersion)
  monitors: MonitorEntity[];
}
