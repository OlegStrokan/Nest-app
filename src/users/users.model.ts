import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { Post } from '../posts/posts.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}


@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'test@gmail.ru', description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '258120', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'http://activation-link.com', description: 'Ссылка для активации електронной почты' })
  @Column({ type: DataType.STRING, allowNull: true })
  activationLink: string;


  @ApiProperty({ example: 'true', description: 'Активированная почта или нет' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActivated: boolean;

  @ApiProperty({ example: 'true', description: 'Забанен или нет' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'За нецензурную лексику', description: 'Причина блокировки' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[]
}
