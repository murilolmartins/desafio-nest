import { Project } from '@prisma/client';

export class ProjectEntity implements Project {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
