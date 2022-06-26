import { IQuery } from '@nestjs/cqrs';

export class GetDepartmentByFacultyId implements IQuery {
  constructor(id: number) {}
}
