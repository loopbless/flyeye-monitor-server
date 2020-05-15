import { IsNotEmpty } from 'class-validator';
import { VersionEntity } from '@/version/version.entity';

export class AppDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  sourceMapPath: string;
}