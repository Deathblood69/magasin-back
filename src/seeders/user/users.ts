import { UserRole } from '../../user/enum/user.role.enum';
import { User } from '../../user/entities/user.entity';
import { DEV_CONFIG } from '../../common/config/app.config';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export const users: User[] = [
  {
    id: uuidv4(),
    lastName: faker.person.lastName().toUpperCase(),
    firstName: faker.person.firstName(),
    username: DEV_CONFIG.login,
    password: DEV_CONFIG.password,
    email: faker.internet.email().toLowerCase(),
    roles: [UserRole.ADMINISTRATEUR],
    disabled: false,
    disabledDate: 0,
    isLocked: false,
    dateLock: 0,
    loginAttempts: 3
  }
];
