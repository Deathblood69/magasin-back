import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { isEqual } from 'lodash';
import { MessageException } from 'src/common/exception/message.exception';
import { UserRole } from 'src/user/enum/user.role.enum';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from './entities/user.entity';
import { GenericServiceInterface } from '../common/genericModule/service/GenericServiceInterface';

@Injectable()
export class UserService implements GenericServiceInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  /**
   * Find all users based on the provided query parameters.
   *
   * @param {PaginateQuery} query - The query parameters for pagination.
   * @return {Promise<Paginated<User>>} A promise that resolves to a paginated list
   * of users.
   */
  public async list(query: FilterQuery<User>): Promise<User[]> {
    return await this.userRepository.find(query);
  }

  /**
   * Finds a user based on a given attribute and value.
   *
   * @param {string} attribute - The attribute to search for.
   * @param {string} value - The value of the attribute to search for.
   * @return {Promise<User>} The user found.
   */
  async findOne(attribute: string, value: string): Promise<User> {
    const user = await this.userRepository.findOne({ [attribute]: value });
    if (!user) {
      throw new NotFoundException(`${attribute} '${value}' inconnu`);
    }
    return user;
  }

  /**
   * Vérifie si le nom d'utilisateur est unique.
   *
   * @param {string} value - Le nom d'utilisateur à vérifier.
   * @return {Promise<boolean>} Vrai si le nom d'utilisateur est unique, faux sinon.
   */
  async checkUniqueUsername(value: string): Promise<boolean> {
    const [users, count] = await this.userRepository.findAndCount({
      username: value,
    });
    return count === 1;
  }

  /**
   * Creates a new user with the provided data.
   *
   * @param {Partial<User>} userData - The data for creating the user.
   * @return {Promise<User>} - A promise that resolves to the created user.
   */
  async create(userData: Partial<User>): Promise<User> {
    if (
      userData.roles === undefined ||
      userData.roles === null ||
      userData.roles.length === 0
    ) {
      throw new UnauthorizedException(`ROLES_INVALIDE`);
    }

    if (!this.checkRegexPassword(userData))
      throw new UnauthorizedException(`REGEX_PASSWORD_INVALIDE`);
    this.isDisabled(userData);
    await this.checkLastRole(userData);

    try {
      await this.saltPassword(userData);
      userData.roles.sort((a, b) => a.localeCompare(b));
      return await this.userRepository.upsert(userData);
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
      MessageException.readMessage(error, 'User');
    }
  }

  /**
   * Check if the provided password meets the specified criteria.
   *
   * @param {Partial<User>} userData - the user data containing the password to be checked
   * @return {boolean} true if the password meets the criteria, false otherwise
   */
  checkRegexPassword(userData: Partial<User>): boolean {
    if (userData.password) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{12,30}$/;
      return passwordRegex.test(userData.password);
    }
    return true;
  }

  /**
   * Checks if the user data is disabled.
   *
   * @param {Partial<User>} userData - The user data to be checked.
   */
  isDisabled(userData: Partial<User>) {
    if (userData.disabled) {
      userData.disabledDate = Date.now();
    }
  }

  /**
   * Saves user data to the database.
   *
   * @param {Partial<User>} userData - The partial user data to be saved.
   * @param id
   * @param idName
   * @return {Promise<User>} The saved user data.
   */
  async update(
    userData: Partial<User>,
    id?: string,
    idName?: string,
  ): Promise<User> {
    return await this.userRepository.upsert(userData);
  }

  /**
   * Deletes a user by their ID.
   *
   * @param {string} userId - The ID of the user to delete.
   * @return {Promise<void>} A promise that resolves when the user is deleted.
   */
  async delete(userId: string): Promise<void> {
    // const user = await this.findOne('id', userId)
    const user = this.userRepository.getReference(userId);
    //Supprime les roles pour checkLastRole.
    user.roles = [];
    await this.checkLastRole(user);
    await this.userRepository.getEntityManager().remove(user).flush();
  }

  /**
   * Check the last role of a user.
   *
   * @param {Partial<User>} partialUser - The user.
   * @return {Promise<boolean>} A boolean indicating whether the user has a last role or not.
   */
  async checkLastRole(partialUser: Partial<User>): Promise<boolean> {
    if (partialUser && partialUser.id) {
      const { roles: roles } = await this.userRepository.findOne({
        id: partialUser.id,
      });
      const rolesPartialUser = Array.from(partialUser.roles.values()).sort();

      //compare la liste des rolesBDD du user avec la liste des roles du Partialuser
      //si pas de diff -> break  ex bdd['ADMIN'] - partial['ADMIN']
      if (isEqual(rolesPartialUser, roles)) {
        return false;
      }

      // si tous les rolesBDD sont dans Partialuser -> break ex bdd['ADMIN'] - partial['ADMIN','ENROLEUR']
      // si au moins un roleBDD n'est pas dans Partialuser -> gestionErreur ex bdd['ADMIN','ENROLEUR','OPERATEUR'] - partial['ADMIN']
      // récupère les roles concernés
      const rolesChange = roles.filter((r) => !rolesPartialUser.includes(r));

      if (rolesChange.length > 0) {
        // find role
        // count users with this role
        // si count user <= 1 -> add rolesExcept to list
        const lastRoles: UserRole[] = [];
        for (const role of rolesChange) {
          const users = await this.userRepository.find({
            roles: { $overlap: [role] },
          });
          if (users.length <= 1) {
            lastRoles.push(role);
          }
        }

        if (lastRoles.length > 0) {
          // HTTPEXCEPTION code 509
          throw new ConflictException(
            `LAST_ROLE_EXCEPTION_${lastRoles.map((value) => value)}`,
          );
        }
      }
      return false;
    }
  }

  /**
   * Hashes the password in the given user data, if necessary.
   *
   * @param {Partial<User>} userData - The user data object.
   */
  private async saltPassword(userData: Partial<User>) {
    try {
      if (_.isUndefined(userData.id) || !_.isUndefined(userData.password)) {
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
      }
    } catch (error) {
      throw new NotFoundException('PASSWORD_NOT_FOUND');
    }
  }
}
