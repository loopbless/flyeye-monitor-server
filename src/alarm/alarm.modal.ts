import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '@/user/user.entity';
import { EventsType } from '@/events/events.enum';
import { PageDto } from '@/common/page.dto';

export class AlarmDto {
  id?: number;
  @IsNotEmpty()
  readonly appId: string;
  @IsNotEmpty()
  readonly mode: string;
  @IsNotEmpty()
  readonly target: string;
  @IsNotEmpty()
  template: string;
  @IsNotEmpty()
  readonly dataType: EventsType;
  user: UserEntity;
  @IsNotEmpty()
  readonly dataTags: string[];
}

export class AlarmPageDto extends PageDto {
  @IsNotEmpty()
  readonly appId: number;
}