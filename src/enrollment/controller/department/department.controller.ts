import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDepartmentCommand } from 'src/enrollment/commands';
import { CreateDepartmentRequestDto } from 'src/enrollment/DTO';
import { GetDepartmentByFacultyId } from 'src/enrollment/queries';

@Controller('department')
export class DepartmentController {
  private readonly logger: Logger;
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) {
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

  @Get('/deptInAFaculty/:id')
  async getDeptbyFacultyId(@Query('id') id: number){
    this.logger.log('In Get department by faculty ID')
    this.logger.log(`Calling queryBus.execute with an instance of ${GetDepartmentByFacultyId.name}`)
    return await this.queryBus.execute(new GetDepartmentByFacultyId(id))
  }

}
