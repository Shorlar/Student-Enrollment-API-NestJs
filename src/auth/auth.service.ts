import { Injectable, Logger } from '@nestjs/common';
import { StudentService } from 'src/student';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/enrollment/entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger: Logger;
  constructor(
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.log('In validate User');
    const student = await this.studentService.findOne(email);
    const isMatch = await bcrypt.compare(password, student.password);
    if (student && isMatch) {
      const { password, ...rest } = student;
      return rest;
    }
    return null;
  }

  async login(student: Student) {
    this.logger.log('In Login User');
    const payload = { email: student.email, sub: student.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
