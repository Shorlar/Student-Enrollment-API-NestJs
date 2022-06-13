import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Department,
  Enrollment,
  Faculty,
  Student,
} from 'src/enrollment/entity';
import { Connection } from 'typeorm';
import { EnrollStudentCommand } from './enrollStudent.command';

@CommandHandler(EnrollStudentCommand)
export class EnrollStudentCommandHandler
  implements ICommandHandler<EnrollStudentCommand>
{
  private readonly logger: Logger;
  constructor(private connection: Connection) {
    this.logger = new Logger(EnrollStudentCommandHandler.name);
  }

  async execute(command: EnrollStudentCommand): Promise<any> {
    this.logger.log(`In ${EnrollStudentCommandHandler.name}`);
    this.logger.log(JSON.stringify(command));
    const {
      body: {
        firstName,
        lastName,
        otherName,
        DOB,
        studentPhoneNumber,
        email,
        guardianName,
        department,
        faculty,
      },
    } = command;

    const connect = await this.connection.createQueryRunner();
    await connect.connect();
    await connect.startTransaction();
    try {
      const dept = await connect.manager.findOne(Department, {
        where: { id: department },
      });
      const facultyEntity = await connect.manager.findOne(Faculty, {
        where: { id: faculty },
      });
      const enrolledStudent = await connect.manager.save(Enrollment, {
        firstName,
        lastName,
        otherName,
        DOB,
        studentPhoneNumber,
        email,
        guardianName,
        department: dept,
        faculty: facultyEntity,
      });
      
      this.logger.log(`Enrolled Student: ${JSON.stringify(enrolledStudent)}`);
      await connect.commitTransaction();
    } catch (error) {
      await connect.rollbackTransaction();
      this.logger.log(`Error: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await connect.release();
    }
  }
}
