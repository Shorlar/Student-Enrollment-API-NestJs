import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './department.entity';
import { Faculty } from './faculty.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  otherName: string;

//   @ManyToOne(() => Faculty, (faculty) => faculty.student)
//   faculty: Faculty;

  @ManyToOne(() => Department, (department) => department.student, {
    eager: true,
  })
  department: Department;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
