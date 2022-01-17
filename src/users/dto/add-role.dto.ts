import { IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Должно быть строкой'})
  readonly value: string;
}
