import { EnrollStudentDto } from 'src/enrollment/DTO';

export class EnrollStudentCommand {
  constructor(public body: EnrollStudentDto) {}
}
