import { Controller, Get, Param, UseGuards, Post, UseInterceptors, Body, UploadedFile, HttpException, HttpStatus, Res, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VersionService } from '@/version/version.service';
import { ApplicationService } from './application.service';
import { JwtAuthGuard } from '@/auth/guards';
import { AppDto } from './application.modal';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@UseGuards(JwtAuthGuard)
@Controller('apps')
export class ApplicationController {


  constructor(private app: ApplicationService,
              private version: VersionService) {}

  @Get(':id')
  async find(@Param('id') id: number) {
    return await this.version.findByAppId(id);
  }

  @Get()
  async findAll(@Req() req, @Res() res) {
    const data = await this.app.findAll(req.query);
    res.setHeader('X-total-count', data[1]);
    res.send(data[0]);
  }

  @Post()
  @UseInterceptors(FileInterceptor('sourceMap'))
  async insert(@UploadedFile() file, @Body() data: AppDto) {
    if(file.mimetype!=='application/zip') {
      return new HttpException('sourcemap只能上传zip类型文件', HttpStatus.BAD_REQUEST);
    }
    data.sourceMapPath = this.upload(file);
    return await this.app.insert(data)
  }

  private upload(file) {
    let path = join(__dirname, '..', 'sourcemap');
    if(!existsSync(path)) {
      mkdirSync(path);
    }
    path = join(path, `${new Date().getTime()}_${file.originalname}`)
    const writeImage = createWriteStream(path, {encoding: 'utf8'});
    writeImage.write(file.buffer);
    return path;
  }
}