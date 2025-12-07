import { Role } from '../enums/role.enum';

export class User {
  constructor(
    public readonly id: string | undefined,
    public readonly name: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly role: Role,
    public readonly status: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt: Date | null,
  ) {}
}
