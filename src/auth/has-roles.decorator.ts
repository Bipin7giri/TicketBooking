import { SetMetadata } from '@nestjs/common';
import { Role } from '../constants/roles.enum';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
