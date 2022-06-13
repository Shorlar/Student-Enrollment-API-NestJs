import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EnrollStudentCommand } from 'src/enrollment/commands';
import { EnrollStudentDto } from 'src/enrollment/DTO';

@Controller('enrollment')
export class EnrollmentController {
  private readonly logger: Logger;
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    this.logger = new Logger(EnrollmentController.name);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async enrollStudent(@Body() enrollStudentDto: EnrollStudentDto) {
    this.logger.log('In enroll student controller');
    this.logger.log('Calling enroll student command');
    return await this.commandBus.execute(
      new EnrollStudentCommand(enrollStudentDto),
    );
  }
}
