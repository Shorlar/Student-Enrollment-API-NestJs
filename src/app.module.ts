import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { HttpErrorFilter } from './enrollment/utils';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    EnrollmentModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    AuthModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
