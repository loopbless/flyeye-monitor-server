import { IsNotEmpty } from 'class-validator';
import { PageDto } from '@/common/page.dto';

export class EventsDto {

  @IsNotEmpty()
  readonly appId: string;

  @IsNotEmpty()
  readonly timestamp: string;

  @IsNotEmpty()
  readonly language: string;

  @IsNotEmpty()
  userAgent: string;

  @IsNotEmpty()
  readonly currentUrl: string;

  readonly fromUrl?: string;

  readonly accountData: string;

  @IsNotEmpty()
  readonly tags: string[];

  location?: string;
  
  @IsNotEmpty()
  data: any;
}

export class EventsPageDto extends PageDto {
  @IsNotEmpty()
  readonly appId: string; // app对应版本id

  @IsNotEmpty()
  readonly tags: string;

  @IsNotEmpty()
  readonly currentUrl: string;

}