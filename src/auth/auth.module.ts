import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { EmailModule } from '../email/email.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    EmailModule,
    // для предотвращения циклической зависимости нужно использовать forwardRef
    forwardRef(() => UserModule),
  JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '24h'
    }
  })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
