import { IsNotEmpty } from 'class-validator';
import { PageDto } from '@/common/page.dto';

export class MonitorDto {

  @IsNotEmpty()
  readonly appId: string;

  @IsNotEmpty()
  readonly timestamp: string;

  @IsNotEmpty()
  readonly agent: string;

  @IsNotEmpty()
  readonly currentUrl: string;

  readonly fromUrl?: string;

  @IsNotEmpty()
  readonly accountData: string;

  @IsNotEmpty()
  readonly tags: string[];

  readonly location?: string;
  
  @IsNotEmpty()
  readonly data: any;
}

export class MonitorPageDto extends PageDto {
  @IsNotEmpty()
  readonly appId: string; // app对应版本id

  @IsNotEmpty()
  readonly tags: string;

  @IsNotEmpty()
  readonly currentUrl: string;

}