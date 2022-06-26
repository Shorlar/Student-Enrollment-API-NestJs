import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/enrollment/entity';
import { Repository } from 'typeorm';
import { GetDepartmentByFacultyId } from './getDeptByFacultyId.query';

@QueryHandler(GetDepartmentByFacultyId)
export class GetDepartmentByFacultyIdQueryHandler
  implements IQueryHandler<GetDepartmentByFacultyId>
{
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Department)
    private readonly repository: Repository<Department>,
  ) {
    this.logger = new Logger(GetDepartmentByFacultyIdQueryHandler.name);
  }
  async execute(query: GetDepartmentByFacultyId): Promise<any> {
    this.logger.log(`In ${GetDepartmentByFacultyIdQueryHandler.name}`);
    const { id } = query;
    this.logger.log('Calling department repository');
    const departments = await this.repository.find({
      relations: {
        faculty: true,
      },
      where: {
        faculty: {
          id,
        },
      },
    });
    this.logger.log('Done calling Department repository');
    const departmentsNames = departments.map(
      (department) => department.departmentName,
    );
    return departmentsNames;
  }
}
