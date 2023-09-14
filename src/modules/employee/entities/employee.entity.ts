import { Employee } from '@prisma/client';

export class EmployeeEntity implements Employee {
  id: number;
  name: string;
  admissionDate: Date;
  baseSalary: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
