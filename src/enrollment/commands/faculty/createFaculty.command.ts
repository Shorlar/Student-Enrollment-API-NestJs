import { createFacultyDto } from 'src/enrollment/DTO';

export class CreateFacultyCommand {
  constructor(public body: createFacultyDto) {}
}
