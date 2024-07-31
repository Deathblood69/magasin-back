import { User } from '../../user/entities/user.entity';
import { UserRole } from 'src/user/enum/user.role.enum';
import { UserService } from '../../user/user.service';
import * as fs from 'fs';
import * as path from 'node:path';
import { HttpException, HttpStatus } from '@nestjs/common';

const classesDir = path.join(__dirname, '../../entities');

const classesMap = {
  user: {
    name: User,
    roles: [UserRole.ADMINISTRATEUR],
    service: UserService
  }
};

/**
 * Retourne le service, la classe ou les roles associés à l'entité en fonction de la chaine de caractères en paramètre.
 * @param className
 * @param type
 */
export function getClassInfoFromString(className: string, type: string) {
  loadClasses();
  const ClassReference = classesMap[className];
  if (ClassReference) {
    return ClassReference[type];
  } else {
    throw new HttpException(
      `La classe ${className} n'est pas définie dans le mappage.`,
      HttpStatus.BAD_REQUEST
    );
  }
}

/**
 * Scan le dossier entities pour charger les classes dans classesMap si elle ne sont pas déjà présentes.
 */
function loadClasses(): void {
  const files = fs
    .readdirSync(classesDir)
    .filter((f) => !f.includes('.d.ts'))
    .filter((f) => !f.includes('.js.map'));

  for (const file of files) {
    const exported = require(path.join(classesDir, file));
    for (const [key, value] of Object.entries(exported)) {
      if (
        typeof value === 'function' &&
        classesMap[key.charAt(0).toLowerCase() + key.slice(1)] === undefined
      ) {
        classesMap[key.charAt(0).toLowerCase() + key.slice(1)] = {
          name: value,
          roles: []
        };
      }
    }
  }
}
