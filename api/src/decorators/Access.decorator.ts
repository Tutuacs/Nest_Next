import { SetMetadata } from '@nestjs/common';
import { ROLE } from './role.enums';

export const ACCESS_KEY = 'roles';
export const Access = (...role: ROLE[]) => SetMetadata(ACCESS_KEY, role);
