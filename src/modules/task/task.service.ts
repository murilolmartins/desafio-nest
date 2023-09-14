import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repositories/task.repository';
import { ProjectService } from '../project/project.service';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly projectService: ProjectService,
    private readonly employeeService: EmployeeService,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    if (createTaskDto.projectId) {
      await this.projectService.projectNotFound(createTaskDto.projectId);
    }

    if (createTaskDto.employeeId) {
      await this.employeeService.employeeNotFound(createTaskDto.employeeId);
    }

    return await this.taskRepository.create(createTaskDto);
  }

  async findAll() {
    return await this.taskRepository.findAll();
  }

  async findOne(id: number) {
    await this.taskNotFound(id);

    return await this.taskRepository.findOne(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskNotFound(id);

    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    await this.taskNotFound(id);

    return await this.taskRepository.remove(id);
  }

  async asignTaskToEmployee(taskId: number, employeeId: number) {
    await this.taskNotFound(taskId);

    await this.employeeService.employeeNotFound(employeeId);

    const task = await this.taskRepository.findOne(taskId);

    const hasProject = await this.employeeService.hasProject(
      employeeId,
      task.projectId,
    );

    if (!hasProject) {
      throw new BadRequestException(
        `Employee ${employeeId} and task ${taskId} are not in the same project`,
      );
    }

    return await this.taskRepository.asignTaskToEmployee(taskId, employeeId);
  }

  async asignTaskToProject(taskId: number, projectId: number) {
    await this.taskNotFound(taskId);
    await this.projectService.projectNotFound(projectId);

    return await this.taskRepository.asignTaskToProject(taskId, projectId);
  }

  private async taskNotFound(id: number): Promise<void> {
    const task = await this.taskRepository.exists(id);

    if (!task) {
      throw new NotFoundException(`Task not found for id ${id}`);
    }
  }
}
