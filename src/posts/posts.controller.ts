import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {

  constructor(private postService: PostsService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts()
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.createPost(dto, image)
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  updatePost(@Param('id') id: number, dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.updatePost(id, dto, image)
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id)
  }


}
