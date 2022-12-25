import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/membership-user/dto/create-membership-user-dto';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
