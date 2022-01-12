import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { ApiProperty } from '@nestjs/swagger';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}


@Table({ tableName: 'posts' })
export class PostModel extends Model<PostModel, PostCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'This is title', description: 'Заголовок поста' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: 'This is some content', description: 'Контент поста' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ example: '89as-d2as-348s-238a-we9w', description: 'Название фотографии' })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  author: User;
}
