import { IsNotEmpty } from 'class-validator';

export class PageDto {
  @IsNotEmpty()
  readonly offset: number;

  @IsNotEmpty()
  readonly limit: number;
}