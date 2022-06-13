import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDepartmentRequestDto{
    @IsNotEmpty()
    @IsString()
    departmentName: string

    @IsNotEmpty()
    @IsNumber()
    facultyId: number
}