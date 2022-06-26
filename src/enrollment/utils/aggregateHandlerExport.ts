import { CreateDepartmentCommandHandler } from '../commands/create-Department/createDepartment.handler';
import { EnrollStudentCommandHandler } from '../commands/enrollStudent/enrollStudent.handler';
import { CreateFacultyCommandHandler } from '../commands/faculty/createFaculty.handler';
import { GetAllFacultyQueryHandler } from '../queries';
import { GetDepartmentByFacultyIdQueryHandler } from '../queries/get-dept-by-faculty/getDepatByFacultyId.handler';

export const FacultyHandlers = [
  CreateFacultyCommandHandler,
  GetAllFacultyQueryHandler,
];
export const EnrollmentHandlers = [EnrollStudentCommandHandler];
export const DepartmentHandlers = [
  CreateDepartmentCommandHandler,
  GetDepartmentByFacultyIdQueryHandler,
];
