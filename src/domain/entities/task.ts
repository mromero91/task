import { User } from './user';

export class Task {
  constructor(
    public readonly id: string | undefined,
    public readonly title: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt: Date | null,
    public readonly createdBy: User,
    public readonly modifiedBy: User | null,
  ) {}
}
