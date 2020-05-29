import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { AppDto } from './application.modal';
import { VersionService } from '@/version/version.service';
import { PageDto } from '@/common/page.dto';
import { VersionEntity } from '@/version/version.entity';
import { aesEncrypt } from '@/utils/utils';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly appRepository: Repository<ApplicationEntity>,
    private version: VersionService,
  ) {}

  async findAll({ offset, limit }: PageDto) {
    return await this.appRepository
      .createQueryBuilder()
      .orderBy('create_at', 'DESC')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
  }

  async find(id: number) {
    const app = await this.appRepository
      .createQueryBuilder('app')
      .leftJoinAndSelect('app.versions', 'version')
      .where('app.id = :id', { id })
      .orderBy('version.create_at', 'DESC')
      .getOne();
      const {id: appId, name, versions: [{id: versionId}]} = app;
    return {id: appId, appId: aesEncrypt(appId + ',' +versionId), name};
  }

  async insert(app: AppDto) {
    const entityManager = getManager();
    const appEntity = new ApplicationEntity();
    appEntity.name = app.name;
    appEntity.user = app.user;
    const application = await entityManager.save(appEntity);
    const versionEntity = new VersionEntity();
    versionEntity.sourceMapPath = app.sourceMapPath;
    versionEntity.tags = app.tags;
    versionEntity.application = application;
    const version = entityManager.save(versionEntity);
    return version;
  }

  async countEvents() {
    const queryResult = await this.appRepository.query(
      `SELECT app.id, app.name, events.tags, COUNT(app.id) as nums FROM application app RIGHT JOIN events ON events.app_id = app.id GROUP BY app.id, events.tags`,
    );
    return queryResult.map(item => ({ ...item, nums: parseInt(item.nums) }));
  }
}
