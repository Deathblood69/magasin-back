import { Entity, Enum, Property } from '@mikro-orm/core';
import { UserRole } from '../enum/user.role.enum';
import { AbstractEntity } from '../../common/abstract/entity.abstract';

@Entity({ tableName: 'user', schema: 'user' })
export class User extends AbstractEntity {
  @Property({ name: 'last_name' })
  lastName: string;

  @Property({ name: 'first_name' })
  firstName: string;

  @Property({ name: 'username', unique: true })
  username: string;

  @Property({ name: 'password', hidden: true })
  password: string;

  @Enum({ items: () => UserRole, nativeEnumName: 'user_role_enum' })
  roles: UserRole[];

  @Property({ name: 'is_disabled', default: false })
  disabled: boolean;

  @Property({ name: 'disabled_date', type: 'bigint', default: 0 })
  disabledDate: number;

  @Property({ name: 'is_locked', default: false })
  isLocked: boolean;

  @Property({ name: 'date_lock', type: 'bigint', default: 0 })
  dateLock: number;

  @Property({ name: 'login_attempts', default: 0 })
  loginAttempts: number;
}
