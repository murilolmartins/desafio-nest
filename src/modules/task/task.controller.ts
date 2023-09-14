import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundSwagger } from 'src/shared/swagger/responses/not-found';
import { DeleteSwagger } from 'src/shared/swagger/responses/delete';

@ApiTags('Tasks')
@Controller('api/v1/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse(NotFoundSwagger('Task not found for id 1'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a task by id' })
  @ApiResponse(NotFoundSwagger('Task not found for id 1'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(+id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiResponse(DeleteSwagger('Task deleted successfully'))
  @ApiResponse(NotFoundSwagger('Task not found for id 1'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.taskService.remove(+id);

    return {
      message: `Task deleted successfully`,
    };
  }

  @ApiOperation({ summary: 'Asign a task to an employee' })
  @ApiResponse(NotFoundSwagger('Task not found for id 1'))
  @ApiResponse(NotFoundSwagger('Employee not found for id 1'))
  @Post(':taskId/employees/:employeeId')
  async asignTaskToEmployee(
    @Param('taskId') taskId: string,
    @Param('employeeId') employeeId: string,
  ) {
    return await this.taskService.asignTaskToEmployee(+taskId, +employeeId);
  }

  @ApiOperation({ summary: 'Asign a task to a project' })
  @ApiResponse(NotFoundSwagger('Task not found for id 1'))
  @ApiResponse(NotFoundSwagger('Project not found for id 1'))
  @Post(':taskId/projects/:projectId')
  async asignTaskToProject(
    @Param('taskId') taskId: string,
    @Param('projectId') projectId: string,
  ) {
    return await this.taskService.asignTaskToProject(+taskId, +projectId);
  }
}
