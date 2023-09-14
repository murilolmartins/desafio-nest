import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Name of the task' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Description of the task' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'Employee ID', default: null })
  @IsString()
  @IsOptional()
  readonly employeeId: number;

  @ApiProperty({ description: 'Project ID', default: null })
  @IsString()
  @IsOptional()
  readonly projectId: number;
}
