import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeEntity } from '../entities/employee.entity';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
    return await this.prisma.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(): Promise<EmployeeEntity[]> {
    return await this.prisma.employee.findMany({ where: { deletedAt: null } });
  }

  async findOne(id: number): Promise<EmployeeEntity | null> {
    return await this.prisma.employee.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        projects: {
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
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    return await this.prisma.employee.update({
      where: {
        id,
        deletedAt: null,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number): Promise<EmployeeEntity> {
    return await this.prisma.employee.update({
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
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    return !!employee;
  }

  async hasProject(id: number, projectId: number): Promise<boolean> {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        projects: {
          where: {
            id: projectId,
            deletedAt: null,
          },
        },
      },
    });

    return !!employee.projects.length;
  }
}
