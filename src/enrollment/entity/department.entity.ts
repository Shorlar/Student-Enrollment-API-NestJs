import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enrollment } from '.';
import { Faculty } from './faculty.entity';
import { Student } from './student.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departmentName: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.department)
  enrollment: Enrollment;

  @OneToMany(() => Student, (student) => student.department)
  student: Student;

  @ManyToOne(() => Faculty, (faculty) => faculty.department)
  faculty: Faculty;
}
