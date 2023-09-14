import { Task } from '@prisma/client';

export class TaskEntity implements Task {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  employeeId: number;
  projectId: number;
}
