import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateFacultyCommand,
} from 'src/enrollment/commands';
import { createFacultyDto } from 'src/enrollment/DTO';
import { GetAllFacultyQuery } from 'src/enrollment/queries';

@Controller('faculty')
export class FacultyController {
  private readonly logger: Logger;
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    this.logger = new Logger(FacultyController.name);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createFaculty(@Body() createFacultyDto: createFacultyDto) {
    this.logger.log('In create faculty controller');
    this.logger.log('calling create faculty command');
    return await this.commandBus.execute(
      new CreateFacultyCommand(createFacultyDto),
    );
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllFaculty() {
    this.logger.log('In get all faculty controller');
    this.logger.log('calling get all faculty command');
    return await this.queryBus.execute(new GetAllFacultyQuery());
  }
}
