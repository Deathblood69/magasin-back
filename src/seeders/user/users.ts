import { UserRole } from '../../user/enum/user.role.enum';
import { DEV_CONFIG } from '../../common/config/app.config';

export const users = [
  {
    lastName: 'COMPTE',
    firstName: 'Administrateur',
    username: DEV_CONFIG.login,
    password: DEV_CONFIG.password,
    roles: [UserRole.ADMINISTRATEUR],
    disabled: false,
    disabledDate: 0,
    isLocked: false,
    dateLock: 0,
    loginAttempts: 3
  }
];
