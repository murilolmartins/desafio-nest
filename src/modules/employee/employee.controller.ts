import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundSwagger } from 'src/shared/swagger/responses/not-found';
import { DeleteSwagger } from 'src/shared/swagger/responses/delete';

@ApiTags('Employees')
@Controller('api/v1/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Create a new employee' })
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeService.create(createEmployeeDto);
  }

  @ApiOperation({ summary: 'Get all employees' })
  @Get()
  async findAll() {
    return await this.employeeService.findAll();
  }

  @ApiOperation({ summary: 'Get an employee by id' })
  @ApiResponse(NotFoundSwagger('Employee not found for id 1'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.employeeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an employee by id' })
  @ApiResponse(NotFoundSwagger('Employee not found for id 1'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return await this.employeeService.update(+id, updateEmployeeDto);
  }

  @ApiOperation({ summary: 'Delete an employee by id' })
  @ApiResponse(DeleteSwagger('Employee deleted successfully'))
  @ApiResponse(NotFoundSwagger('Employee not found for id 1'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.employeeService.remove(+id);

    return {
      message: `Employee deleted successfully`,
    };
  }
}
