import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FrameworkEntity } from "./framework.entity";
import { Repository } from "typeorm";

@Injectable()
export class FrameworkService {
  constructor(
    @InjectRepository(FrameworkEntity)
    private readonly frameworkRepository: Repository<FrameworkEntity>,
  ) {}
  

  async findAll() {
    return await this.frameworkRepository.find()
  }

}