import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/enrollment/entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Student) private readonly repository: Repository<Student>,
  ) {
    this.logger = new Logger(StudentService.name);
  }

  async findOne(email: string): Promise<Student | undefined> {
    return await this.repository.findOne({ where: { email } });
  }
}
