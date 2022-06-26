import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentController } from './controller/enrollment/enrollment.controller';
import { StudentController } from './controller/student/student.controller';
import { Department, Enrollment, Faculty, Student } from './entity';
import { FacultyController } from './controller/faculty/faculty.controller';
import { DepartmentController } from './controller/department/department.controller';
import { CqrsModule } from '@nestjs/cqrs';
import {
  FacultyHandlers,
  EnrollmentHandlers,
  DepartmentHandlers,
} from './utils/aggregateHandlerExport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment, Student, Faculty, Department]),
    CqrsModule,
  ],
  controllers: [
    EnrollmentController,
    StudentController,
    FacultyController,
    DepartmentController,
  ],
  providers: [...FacultyHandlers, ...EnrollmentHandlers, ...DepartmentHandlers],
})
export class EnrollmentModule {}
