import { IsNotEmpty, IsString } from "class-validator";

export class createFacultyDto{
    @IsString()
    @IsNotEmpty()
    facultyName: string
}