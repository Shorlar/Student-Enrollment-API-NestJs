import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Body,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateDepartmentCommand } from 'src/enrollment/commands';
import { CreateDepartmentRequestDto } from 'src/enrollment/DTO';

@Controller('department')
export class DepartmentController {
  private readonly logger: Logger;
  constructor(private readonly commandBus: CommandBus) {
    this.logger = new Logger(DepartmentController.name);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createDepartment(@Body() body: CreateDepartmentRequestDto) {
    this.logger.log('In create department controller');
    this.logger.log(
      `Calling commandBus.execute with an instance of ${CreateDepartmentRequestDto.name}`,
    );
    return await this.commandBus.execute(new CreateDepartmentCommand(body));
  }
}
