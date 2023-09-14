import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundSwagger } from 'src/shared/swagger/responses/not-found';
import { ConflictSwagger } from 'src/shared/swagger/responses/conflict';
import { DeleteSwagger } from 'src/shared/swagger/responses/delete';

@ApiTags('Projects')
@Controller('api/v1/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse(ConflictSwagger('Project with name "Project 1" already exists'))
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @ApiOperation({ summary: 'Get all projects' })
  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @ApiOperation({ summary: 'Get a project by id' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a project by id' })
  @ApiResponse(NotFoundSwagger('Project not found for id 1'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.update(+id, updateProjectDto);
  }

  @ApiOperation({ summary: 'Delete a project by id' })
  @ApiResponse(DeleteSwagger('Project deleted successfully'))
  @ApiResponse(NotFoundSwagger('Project not found for id 1'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.projectService.remove(+id);

    return {
      message: `Project deleted successfully`,
    };
  }

  @ApiOperation({ summary: 'Add an employee to a project' })
  @ApiResponse(NotFoundSwagger('Project not found for id 1'))
  @ApiResponse(NotFoundSwagger('Employee not found for id 1'))
  @Post(':projectId/employees/:employeeId')
  async addEmployeeToProject(
    @Param('projectId') projectId: string,
    @Param('employeeId') employeeId: string,
  ) {
    return await this.projectService.addEmployeeToProject(
      +projectId,
      +employeeId,
    );
  }
}
