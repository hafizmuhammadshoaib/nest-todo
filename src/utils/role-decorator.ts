import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/user/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Partial<Role[]>) =>
  SetMetadata(ROLES_KEY, roles);
