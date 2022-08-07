import { Student } from '../entity';

export class StudentNotificationDto {
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly otherName?: string;
  private readonly email: string;
  private readonly department: string;

  constructor(student: Student) {
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.otherName = student.otherName;
    this.email = student.email;
    this.department = student.department.departmentName;
  }
}
