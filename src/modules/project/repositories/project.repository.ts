import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectEntity } from '../entities/project.entity';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return await this.prisma.project.create({
      data: createProjectDto,
    });
  }

  async findAll(): Promise<ProjectEntity[]> {
    return await this.prisma.project.findMany({ where: { deletedAt: null } });
  }

  async findOne(id: number): Promise<ProjectEntity | null> {
    return await this.prisma.project.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        employees: {
          select: {
            name: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            deletedAt: null,
          },
        },
        tasks: {
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
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    return await this.prisma.project.update({
      where: {
        id,
        deletedAt: null,
      },
      data: updateProjectDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.project.update({
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
    const Project = await this.prisma.project.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    return !!Project;
  }

  async findOneByName(name: string): Promise<ProjectEntity | null> {
    return await this.prisma.project.findUnique({
      where: {
        name,
        deletedAt: null,
      },
    });
  }

  async addEmployeeToProject(
    projectId: number,
    employeeId: number,
  ): Promise<Partial<ProjectEntity>> {
    return await this.prisma.project.update({
      where: {
        id: projectId,
        deletedAt: null,
      },
      data: {
        employees: {
          connect: {
            id: employeeId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        employees: {
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
}
