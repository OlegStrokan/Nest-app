import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адресс'})
  @IsString({ message: 'Должно быть строкой'})
  @IsEmail({},{ message: 'Не корректный email'})
  readonly email: string;


  @ApiProperty({ example: '1', description: 'Идентификатор'})
  @IsString({ message: 'Должно быть цифрой'})
  readonly id: number;

}
