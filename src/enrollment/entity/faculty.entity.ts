import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './department.entity';
import { Enrollment } from './enrollment.entity';
import { Student } from './student.entity';

@Entity()
export class Faculty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  facultyName: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.faculty)
  enrollment: Enrollment;

//   @OneToMany(() => Student, (student) => student.faculty)
//   student: Student;

  @OneToMany(() => Department, (department) => department.faculty)
  department: Department;
}
