import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger;
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
    this.logger = new Logger(LocalStrategy.name);
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.log('In Validate method');
    const student = await this.authService.validateUser(username, password);
    if (!student) {
      throw new HttpException(
        'Invalid Login Credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return student;
  }
}
