import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserModule } from './users/users.module';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5454,
      username: 'postgres',
      password: 'root',
      database: 'nest-app',
      models: [User, Role, UserRoles],
      autoLoadModels: true
    }),
    UserModule,
    RolesModule,
    AuthModule
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AppModule {}
