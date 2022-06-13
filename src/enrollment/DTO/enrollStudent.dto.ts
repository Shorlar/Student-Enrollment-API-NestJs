import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
  min,
} from 'class-validator';

export class EnrollStudentDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  otherName: string;

  @IsString()
  @IsNotEmpty()
  @IsISO8601()
  DOB: string;

  @IsString()
  @IsNotEmpty()
  guardianName: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(9, 11)
  studentPhoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  department: number;

  @IsNumber()
  @IsNotEmpty()
  faculty: number;
}
