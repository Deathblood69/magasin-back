import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../../user/entities/user.entity';
import { UserRole } from '../../user/enum/user.role.enum';
import * as bcrypt from 'bcrypt';
import { users } from './users';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const entitiesInBdd = await em.findAll(User);
    if (entitiesInBdd.length > 0) await em.removeAndFlush(entitiesInBdd);

    for (const user of users) {
      const saltRounds = 10;
      const password = await bcrypt.hash(user.password, saltRounds);
      em.create(User, { ...user, password });
    }
  }
}
