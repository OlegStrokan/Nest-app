 import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
 import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
 import { CreateUserDto } from '../users/dto/create-user.dto';
 import { AuthService } from './auth.service';
 import { UpdateUserDto } from '../users/dto/update-user.dto';
 import { User } from '../users/users.model';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Логинизация'})
  @ApiOkResponse({status: 200})
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @ApiOperation({summary: 'Регистрация'})
  @ApiOkResponse({status: 200})
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @ApiOperation({summary: 'Изменить данные профиля (email)'})
  @ApiOkResponse({status: 200, type: User})
  @Patch('/update')
  updateProfile(@Body() userDto: UpdateUserDto) {
    return this.authService.updateProfile(userDto)
  }

  @ApiOperation({summary: 'Активировать профиль через почту'})
  @ApiOkResponse({status: 200})
  @Get('/activate/:link')
  activate(@Param('link') link: string)  {
    return this.authService.activate(link)
  }


}
