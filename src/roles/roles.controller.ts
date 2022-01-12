import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Role } from './roles.model';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

  constructor(private roleService: RolesService) {}

  @ApiOperation({summary: 'Получить роль по значению'})
  @ApiResponse({status: 200, type: Role})
  @Get('/:value')
  get(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @ApiOperation({summary: 'Создать роль'})
  @ApiResponse({status: 200, type: Role})
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

}
