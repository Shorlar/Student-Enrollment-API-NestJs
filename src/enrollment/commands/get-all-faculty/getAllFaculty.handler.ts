import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from 'src/enrollment/entity';
import { Repository } from 'typeorm';
import { GetAllFacultyQuery } from './getAllfaculty.query';
import { GetAllFacultyResponseDto } from './getAllfacultyResponse.Dto';

@QueryHandler(GetAllFacultyQuery)
export class GetAllFacultyQueryHandler
  implements IQueryHandler<GetAllFacultyQuery>
{
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Faculty) private readonly repository: Repository<Faculty>,
  ) {
    this.logger = new Logger(GetAllFacultyQueryHandler.name);
  }

  async execute(query: GetAllFacultyQuery): Promise<any> {
    this.logger.log(`In ${GetAllFacultyQueryHandler.name}`);
    try {
      this.logger.log('Calling repository');
      this.logger.log('fetching all faculties');
      const allFaculties = await this.repository.find();
      this.logger.log(allFaculties);
      return new GetAllFacultyResponseDto(allFaculties);
    } catch (error) {
      this.logger.log(`Error: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
