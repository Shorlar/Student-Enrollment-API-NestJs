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
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment, Student, Faculty, Department]),
    CqrsModule,
    ClientsModule.register([
      {
        name: 'NOTIFICATION',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'notification_queue',
          queueOptions: {
            durable: false
          }
        }
      },
    ]),
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
