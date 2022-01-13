import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

  constructor(private roleService: RolesService) {}

  @ApiOperation({summary: 'Получить роль по значению'})
  @ApiOkResponse({status: 200, type: Role})
  @Get('/:value')
  get(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @ApiOperation({summary: 'Создать роль'})
  @ApiOkResponse({status: 200, type: Role})
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

}
