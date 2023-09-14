import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { EmployeeRepository } from './repositories/employee.repository';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService, EmployeeRepository],
  exports: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}
