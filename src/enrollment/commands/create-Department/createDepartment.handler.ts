import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Department, Faculty } from 'src/enrollment/entity';
import { EntityManager } from 'typeorm';
import { CreateDepartmentCommand } from './createDepartment.command';

@CommandHandler(CreateDepartmentCommand)
export class CreateDepartmentCommandHandler
  implements ICommandHandler<CreateDepartmentCommand>
{
  private readonly logger: Logger;
  constructor(@InjectEntityManager() private entityManager: EntityManager) {
    this.logger = new Logger(CreateDepartmentCommandHandler.name);
  }

  async execute(command: CreateDepartmentCommand): Promise<any> {
    this.logger.log(`In ${CreateDepartmentCommandHandler.name}`);
    try {
      const {
        body: { departmentName, facultyId },
      } = command;
      this.logger.log('Calling faculty Repository to fetch faculty entity');
      const facultyEntity = await this.entityManager.findOneBy(Faculty, {
        id: facultyId,
      });
      if (!facultyEntity)
        throw new HttpException(
          `Faculty with ID ${facultyId} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      const deptDetails = {
        departmentName,
        faculty: facultyEntity,
      };
      this.logger.log(
        'Calling Department Repository to create and save new department',
      );
      const savedDepartment = await this.entityManager.save(
        Department,
        deptDetails,
      );
      this.logger.log('Done saving Department');
      return {
        status: 'OK',
        message: `${savedDepartment.departmentName} with ID ${savedDepartment.id} has been succesfully created`,
      };
    } catch (error) {
      this.logger.log(JSON.stringify(error));
      throw new HttpException(
        error.staus || 'Unkwon error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
