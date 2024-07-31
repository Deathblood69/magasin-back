import { FilterQuery, Loaded, PopulatePath } from '@mikro-orm/core';

export interface GenericServiceInterface {
  list(filter: FilterQuery<any>): Promise<any>;

  findOne(
    id: string,
    idName: string
  ): Promise<Loaded<object, never, PopulatePath.ALL, never>[]> | Promise<any>;

  create(dto: any): Promise<any>;

  delete(id: string, idName: string): Promise<void>;

  update(dto: any, id?: string, idName?: string): Promise<any>;
}
