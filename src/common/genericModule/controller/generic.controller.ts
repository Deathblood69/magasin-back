import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  EntityManager,
  EntityRepository,
  FilterQuery,
  wrap,
} from '@mikro-orm/core'
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import {AuthGuard} from '../../../auth/guard/auth.guard'
import {getClassInfoFromString} from '../genericMappingClass'
import {MessageException} from '../../exception/message.exception'

@ApiTags('Entity')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class GenericController {
  constructor(private readonly em: EntityManager) {}

  @Get(':entity')
  async list(
    @Param('entity') entity: string,
    @Body() filter: FilterQuery<any>,
  ) {
    const service = getClassInfoFromString(entity, 'service')

    if (service) {
      const customService = this.getCustomService(entity, service)
      return customService.list(filter)
    }
    try {
      return await this.em.find(getClassInfoFromString(entity, 'name'), filter)
    } catch (e) {
      MessageException.readMessage(e, entity)
    }
  }

  @Get(':entity/:id/:idName')
  async findOne(
    @Param('entity') entity: string,
    @Param('id') id: string,
    @Param('idName') idName: string,
  ): Promise<any> {
    const service = getClassInfoFromString(entity, 'service')
    if (service) {
      const customService = this.getCustomService(entity, service)
      return customService.findOne(idName, id)
    }
    try {
      return this.em.findOneOrFail(getClassInfoFromString(entity, 'name'), {
        [idName]: id,
      })
    } catch (e) {
      MessageException.readMessage(e, entity)
    }
  }

  @Post(':entity')
  async create(
    @Param('entity') entity: string,
    @Body() dto: any,
  ): Promise<any> {
    const service = getClassInfoFromString(entity, 'service')

    if (service) {
      const customService = this.getCustomService(entity, service)
      return customService.create(dto)
    }
    try {
      return await this.em.insert(getClassInfoFromString(entity, 'name'), dto)
    } catch (e) {
      if (e.name === 'UniqueConstraintViolationException') {
        throw new HttpException(
          `${e?.detail.split('(')[1].split(')')[0]} doit être unique`,
          409,
        )
      } else {
        MessageException.readMessage(e, entity)
      }
    }
  }

  @Delete(':entity/:id/:idName')
  async delete(
    @Param('entity') entity: string,
    @Param('id') id: string,
    @Param('idName') idName: string,
  ): Promise<void> {
    const service = getClassInfoFromString(entity, 'service')
    if (service) {
      const customService = this.getCustomService(entity, service)
      return customService.delete(id)
    }

    // @ts-ignore
    const current = await this.em.findOneOrFail(
      getClassInfoFromString(entity, 'name'),
      {
        [idName]: id,
      },
    )
    try {
      await this.em.remove(current).flush()
    } catch (e) {
      MessageException.readMessage(e, entity)
    }
  }

  @Patch(':entity/:id/:idName')
  async update(
    @Param('entity') entity: string,
    @Param('id') id: string,
    @Param('idName') idName: string,
    @Body() dto,
  ): Promise<void> {
    const service = getClassInfoFromString(entity, 'service')
    if (service) {
      const customService = this.getCustomService(entity, service)
      return customService.update(dto)
    }
    try {
      // @ts-ignore
      const current = await this.em.findOneOrFail(
        getClassInfoFromString(entity, 'name'),
        {
          [idName]: id,
        },
      )

      // @ts-ignore
      wrap(current).assign({
        ...current,
        ...dto,
      })

      await this.em.flush()
    } catch (e) {
      MessageException.readMessage(e, entity)
    }
  }

  private getCustomService(entity: string, service) {
    const repo = new EntityRepository(
      this.em,
      getClassInfoFromString(entity, 'name'),
    )
    return new service(repo)
  }
}
