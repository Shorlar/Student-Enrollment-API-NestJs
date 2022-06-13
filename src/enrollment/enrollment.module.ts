import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentController } from './controller/enrollment/enrollment.controller';
import { StudentController } from './controller/student/student.controller';
import { Enrollment, Faculty, Student } from './entity';
import { FacultyController } from './controller/faculty/faculty.controller';
import { DepartmentController } from './controller/department/department.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FacultyHandlers, EnrollmentHandlers } from './utils/aggregateHandlerExport';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Student, Faculty]), CqrsModule],
  controllers: [
    EnrollmentController,
    StudentController,
    FacultyController,
    DepartmentController,
  ],
  providers: [
    ...FacultyHandlers,
    ...EnrollmentHandlers
  ]
})
export class EnrollmentModule {}
