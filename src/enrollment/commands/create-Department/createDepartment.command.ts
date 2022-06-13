import { CreateDepartmentRequestDto } from 'src/enrollment/DTO';

export class CreateDepartmentCommand {
  constructor(public body: CreateDepartmentRequestDto) {}
}
