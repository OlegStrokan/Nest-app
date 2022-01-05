import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адресс'})
  readonly email: string;
  @ApiProperty({ example: '258120', description: 'Пароль'})
  readonly password: string;
}
