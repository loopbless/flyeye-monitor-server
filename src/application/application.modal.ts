import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '@/user/user.entity';

export class AppDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  sourceMapPath: string;
  user: UserEntity;
  readonly tags: string[];
}