import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('auth')
export class AuthController {
  private readonly logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    this.logger.log('In login controller');
    return await this.authService.login(req.user);
  }
}
