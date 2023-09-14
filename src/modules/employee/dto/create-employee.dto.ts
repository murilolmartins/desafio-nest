import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Name of the employee' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Employee Admission date' })
  @IsDateString()
  @IsNotEmpty()
  readonly admissionDate: string;

  @ApiProperty({ description: 'Employee base salary' })
  @Min(1)
  @IsNotEmpty()
  readonly baseSalary: number;
}
