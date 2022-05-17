import { Module } from '@nestjs/common';
import { EnrollmentController } from './controller/enrollment/enrollment.controller';
import { StudentController } from './controller/student/student.controller';

@Module({
  controllers: [EnrollmentController, StudentController],
})
export class EnrollmentModule {}
