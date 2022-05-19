import { Faculty } from "src/enrollment/entity"

export class CreateFacultyResponseDto{
    private readonly status: string = 'OK'
    private readonly message: string

    constructor(faculty: Faculty){
        this.message = `${faculty.facultyName} faculty has been succesfully created`
    }
}