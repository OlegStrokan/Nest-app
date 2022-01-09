import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адресс'})
  @IsString({ message: 'Должно быть строкой'})
  @IsEmail({},{ message: 'Не корректный email'})
  readonly email: string;

  @ApiProperty({ example: '258120', description: 'Пароль'})
  @IsString({ message: 'Должно быть строкой'})
  @Length(4,16, { message: 'Не меньше 4 и не больше 16 символов'})
  readonly password: string;
}
