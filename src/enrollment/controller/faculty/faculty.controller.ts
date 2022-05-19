import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateFacultyCommand } from 'src/enrollment/commands';
import { createFacultyDto } from 'src/enrollment/DTO';

@Controller('faculty')
export class FacultyController {
  private readonly logger: Logger;
  constructor(private readonly commandBus: CommandBus) {
    this.logger = new Logger(FacultyController.name);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createFaculty(@Body() createFacultyDto: createFacultyDto) {
    this.logger.log('In create faculty controller');
    this.logger.log('calling create faculty command')
    return await this.commandBus.execute(
      new CreateFacultyCommand(createFacultyDto),
    );
  }
}
