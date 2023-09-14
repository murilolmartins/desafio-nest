import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { TaskRepository } from './repositories/task.repository';
import { ProjectModule } from '../project/project.module';
import { ProjectService } from '../project/project.service';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeRepository } from '../employee/repositories/employee.repository';
import { ProjectRepository } from '../project/repositories/project.repository';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    PrismaService,
    TaskRepository,
    ProjectService,
    EmployeeService,
    EmployeeRepository,
    ProjectRepository,
  ],
  imports: [ProjectModule, EmployeeModule],
})
export class TaskModule {}
