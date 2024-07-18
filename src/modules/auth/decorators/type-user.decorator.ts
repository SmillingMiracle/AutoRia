import { SetMetadata } from '@nestjs/common';

export const TYPES_KEY = 'type';

export const UserType = (...types: string[]) => SetMetadata(TYPES_KEY, types);
