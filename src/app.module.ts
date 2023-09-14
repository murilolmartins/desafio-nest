import { Module } from '@nestjs/common';
import { EmployeeModule } from './modules/employee/employee.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [EmployeeModule, ProjectModule, TaskModule],
})
export class AppModule {}
