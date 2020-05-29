import { ApplicationEntity } from "@/application/application.entity";
import { OneToMany, Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity('framework')
export class FrameworkEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 20, unique: true})
  name: string;

  @Column('text')
  icon: string;

  @Column({ name: 'create_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间'})
  createAt: Date;

  @Column('text')
  example: string;

  @OneToMany(() => ApplicationEntity, app => app.framework)
  apps: ApplicationEntity[];
  
}