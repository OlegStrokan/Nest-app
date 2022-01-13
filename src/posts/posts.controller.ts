import { Body, Controller, Delete, Get, Param, Post, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostModel } from './posts.model';

@ApiTags('Посты')
@Controller('posts')
export class PostsController {

  constructor(private postService: PostsService) {}

  @ApiOperation({summary: 'Получить все посты'})
  @ApiOkResponse({status: 200, type: [PostModel]})
  @Get()
  getPosts() {
    return this.postService.getPosts()
  }

  @ApiOperation({summary: 'Создать новый пост'})
  @ApiOkResponse({status: 200, type: PostModel})
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.createPost(dto, image)
  }

  @ApiOperation({summary: 'Изменить конкретный пост'})
  @ApiOkResponse({status: 200, type: PostModel})
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  updatePost(@Param('id') id: number, @Body() dto: UpdatePostDto, @UploadedFile() image) {
    return this.postService.updatePost(id, dto, image)
  }

  @ApiOperation({summary: 'Удалить конкретный пост'})
  @ApiOkResponse({status: 200})
  @Delete('/:id')
  deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id)
  }


}
