import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from 'src/enrollment/entity';
import { Repository } from 'typeorm';
import { CreateFacultyCommand } from './createFaculty.command';
import { CreateFacultyResponseDto } from './createFacultyResponsedto';

@CommandHandler(CreateFacultyCommand)
export class CreateFacultyCommandHandler
  implements ICommandHandler<CreateFacultyCommand>
{
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Faculty)
    private readonly repository: Repository<Faculty>,
  ) {
    this.logger = new Logger(CreateFacultyCommandHandler.name);
  }

  async execute(command: CreateFacultyCommand): Promise<any> {
    this.logger.log(`In ${CreateFacultyCommandHandler.name}`);
    const { body } = command;
    try {
      this.logger.log('calling faculty repository');
      this.logger.log('creating faculty');
      const createFaculty = await this.repository.save(body);
      this.logger.log(`Done creating faculty`)
      this.logger.log(`Faculty: ${createFaculty.facultyName}`);
      return new CreateFacultyResponseDto(createFaculty);
    } catch (error) {
      this.logger.log(`Error: ${error}`);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
