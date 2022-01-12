import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel } from './posts.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

  constructor(@InjectModel(PostModel) private postRepository: typeof PostModel, private fileService: FilesService) {}

  async getPosts() {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async createPost(dto: CreatePostDto, image) {
    const fileName = await this.fileService.createFile(image)
    console.log(dto)
    const post = await this.postRepository.create({...dto, image: fileName});
    return post;
  }

  async updatePost(id, dto: UpdatePostDto, image) {
    const post = await this.postRepository.findOne({ where: { id }})
     post.content = dto.content
     post.title = dto.title;
    const fileName = await this.fileService.createFile(image)
     post.image = fileName
     await post.save()
     return post
  }

  async deletePost(id) {
     await this.postRepository.destroy({ where: { id }})
  }





}
