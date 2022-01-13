import { Controller, Post, Get, Body, UseGuards, UsePipes, Delete, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles-guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Получение всех пользователей'})
  @ApiOkResponse({status: 200, type: [User]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiOkResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }


  @ApiOperation({summary: 'Выдать роль'})
  @ApiOkResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }

  @ApiOperation({summary: 'Забанить пользователя'})
  @ApiOkResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto)
  }

  @ApiOperation({summary: 'Удалить пользователя'})
  @ApiOkResponse({status: 200, type: [User]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id)
  }
}
