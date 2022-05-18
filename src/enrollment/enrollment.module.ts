import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentController } from './controller/enrollment/enrollment.controller';
import { StudentController } from './controller/student/student.controller';
import { Enrollment, Faculty, Student } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Student, Faculty])],
  controllers: [EnrollmentController, StudentController],
})
export class EnrollmentModule {}
