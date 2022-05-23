import { Faculty } from "src/enrollment/entity";

export class GetAllFacultyResponseDto{
    private readonly status: string = 'OK'
    private readonly data: Object;
    constructor(faculty: Faculty[]){
        this.data = faculty
    }

}