import { GetAllFacultyQueryHandler } from "../commands";
import { CreateFacultyCommandHandler } from "../commands/faculty/createFaculty.handler";

export const FacultyHandlers = [CreateFacultyCommandHandler, GetAllFacultyQueryHandler]