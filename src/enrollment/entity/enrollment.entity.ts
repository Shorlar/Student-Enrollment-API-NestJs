import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from './department.entity';
import { Faculty } from './faculty.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  otherName: string;

  @Column()
  DOB: Date;

  @Column()
  guardianName: string;

  @Column()
  studentPhoneNumber: number;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Department, (department) => department.enrollment, {
    eager: true,
  })
  department: Department;

  @ManyToOne(() => Faculty, (faculty) => faculty.enrollment, { eager: true })
  faculty: Faculty;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
