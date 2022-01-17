import { IsString } from 'class-validator';

export class BanUserDto {
  @IsString({ message: 'Должно быть строкой'})
  readonly banReason: string;
}
