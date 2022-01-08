import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    // для предотвращения циклической зависимости нужно использовать forwardRef
    forwardRef(() => UserModule),
    UserModule,
  JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '24h'
    }
  })
  ]
})
export class AuthModule {}
