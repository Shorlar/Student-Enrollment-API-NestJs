import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StudentModule } from 'src/student/student.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    StudentModule,
    PassportModule,
    JwtModule.register({
      secret: `${new ConfigService().get<string>('SECRET_KEY')}`,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
