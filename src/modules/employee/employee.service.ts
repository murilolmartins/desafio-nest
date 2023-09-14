import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './repositories/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeRepository.create(createEmployeeDto);
  }

  async findAll() {
    return await this.employeeRepository.findAll();
  }

  async findOne(id: number) {
    await this.employeeNotFound(id);

    return await this.employeeRepository.findOne(id);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeeNotFound(id);

    return await this.employeeRepository.update(id, updateEmployeeDto);
  }

  async remove(id: number) {
    await this.employeeNotFound(id);

    return await this.employeeRepository.remove(id);
  }

  async hasProject(id: number, projectId: number) {
    await this.employeeNotFound(id);

    return await this.employeeRepository.hasProject(id, projectId);
  }

  async employeeNotFound(id: number): Promise<void> {
    const employee = await this.employeeRepository.exists(id);

    if (!employee) {
      throw new NotFoundException(`Employee not found for id ${id}`);
    }
  }
}
