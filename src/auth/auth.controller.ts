 import { Body, Controller, Patch, Post } from '@nestjs/common';
 import { ApiTags } from '@nestjs/swagger';
 import { CreateUserDto } from '../users/dto/create-user.dto';
 import { AuthService } from './auth.service';
 import { User } from '../users/users.model';
 import { UpdateUserDto } from '../users/dto/update-user.dto';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}


  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @Patch('/update')
  updateProfile(@Body() userDto: UpdateUserDto): Promise<User> {
    return this.authService.updateProfile(userDto)
  }


}
