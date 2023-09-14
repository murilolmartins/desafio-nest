import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { ProjectRepository } from './repositories/project.repository';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeRepository } from '../employee/repositories/employee.repository';

@Module({
  controllers: [ProjectController],
  providers: [
    ProjectService,
    PrismaService,
    ProjectRepository,
    EmployeeService,
    EmployeeRepository,
  ],
  imports: [EmployeeModule],
  exports: [ProjectService, ProjectRepository],
})
export class ProjectModule {}
