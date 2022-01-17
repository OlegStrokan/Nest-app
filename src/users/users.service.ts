import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { EmailService } from '../email/email.service';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService, private mailService: EmailService) {
  }

  async createUser(dto: CreateUserDto) {
    const activationLink = uuid.v4();
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await this.mailService.sendActivationMail(dto.email, `http://localhost:5000/auth/activate/${activationLink}`);
    user.activationLink = activationLink;
    await user.$set('roles', [role.id]);
    user.roles = [role];
    await user.save();
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, include: { all: true } });
    return user;
  }


  async getUserByLink(activationLink: string) {
    const user = await this.userRepository.findOne({ where: { activationLink }, include: { all: true } });
    return user;
  }


  async addRole(dto: AddRoleDto, id: number) {
    const user = await this.userRepository.findByPk(id);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      // $add - аналог append
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto, id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    // обновляем значения в базе данных
    await user.save();
    return user;
  }

  async delete(id: number) {
    await this.userRepository.destroy({where: {id}})
  }
}
