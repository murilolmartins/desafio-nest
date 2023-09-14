import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './repositories/project.repository';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly employeeService: EmployeeService,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    await this.projectConflictByName(createProjectDto.name);

    return await this.projectRepository.create(createProjectDto);
  }

  async findAll() {
    return await this.projectRepository.findAll();
  }

  async findOne(id: number) {
    await this.projectNotFound(id);

    return await this.projectRepository.findOne(id);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.projectNotFound(id);

    if (updateProjectDto.name) {
      await this.projectConflictByName(updateProjectDto.name);
    }

    return await this.projectRepository.update(id, updateProjectDto);
  }

  async remove(id: number) {
    await this.projectNotFound(id);

    await this.projectRepository.remove(id);
  }

  async addEmployeeToProject(projectId: number, employeeId: number) {
    await this.projectNotFound(projectId);
    await this.employeeService.employeeNotFound(employeeId);

    return await this.projectRepository.addEmployeeToProject(
      projectId,
      employeeId,
    );
  }

  async projectNotFound(id: number): Promise<void> {
    const project = await this.projectRepository.exists(id);

    if (!project) {
      throw new NotFoundException(`Project not found for id ${id}`);
    }
  }

  private async projectConflictByName(name: string): Promise<void> {
    const project = await this.projectRepository.findOneByName(name);

    if (project) {
      throw new ConflictException(`Project with name "${name}" already exists`);
    }
  }
}
