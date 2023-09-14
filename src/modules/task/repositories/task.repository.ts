import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll(): Promise<Partial<TaskEntity>[]> {
    return await this.prisma.task.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        employee: {
          select: {
            name: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            deletedAt: null,
          },
        },
        project: {
          select: {
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Partial<TaskEntity> | null> {
    return await this.prisma.task.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        employee: {
          select: {
            name: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            deletedAt: null,
          },
        },
        project: {
          select: {
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Partial<TaskEntity>> {
    return await this.prisma.task.update({
      where: {
        id,
        deletedAt: null,
      },
      data: updateTaskDto,
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        employee: {
          select: {
            name: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            deletedAt: null,
          },
        },
        project: {
          select: {
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.task.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async exists(id: number): Promise<boolean> {
    const Task = await this.prisma.task.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    return !!Task;
  }

  async asignTaskToEmployee(
    taskId: number,
    employeeId: number,
  ): Promise<Partial<TaskEntity>> {
    return await this.prisma.task.update({
      where: {
        id: taskId,
        deletedAt: null,
      },
      data: {
        employeeId: employeeId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        employee: {
          select: {
            name: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }

  async asignTaskToProject(
    taskId: number,
    projectId: number,
  ): Promise<Partial<TaskEntity>> {
    return await this.prisma.task.update({
      where: {
        id: taskId,
        deletedAt: null,
      },
      data: {
        projectId: projectId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        project: {
          select: {
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }
}
