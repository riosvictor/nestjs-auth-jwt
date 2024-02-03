import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Entity } from '@/domain/interfaces';
import { IRepository } from '@/domain/interfaces';
import { BusinessException } from '@/domain/exceptions/bussiness.exception';

@Injectable()
export class RepositoryTypeOrm<
  TEntity extends Entity<TEntity['id']>,
> extends IRepository<TEntity, TEntity['id']> {
  constructor(private readonly _repositoryORM: Repository<TEntity>) {
    super();
  }

  async create(data: TEntity): Promise<TEntity> {
    data.id = crypto.randomUUID();

    const user = await this._repositoryORM.save(data);
    return user;
  }

  async update(id: TEntity['id'], data: TEntity): Promise<TEntity> {
    const entity = await this.getById(id);
    const updatedProps = {
      id: entity.id,
      ...data,
    };
    const entityUpdated = await this._repositoryORM.save(updatedProps);

    return entityUpdated;
  }

  async patch(id: TEntity['id'], data: Partial<TEntity>): Promise<TEntity> {
    const entity = await this.getById(id);
    const updatedProps = {
      ...entity,
      ...data,
    };
    const entityUpdated = await this._repositoryORM.save(updatedProps);

    return entityUpdated;
  }

  async getById(id: TEntity['id']): Promise<TEntity> {
    const options: FindOptionsWhere<TEntity> = {
      id: id as any,
    };
    const user = await this._repositoryORM.findOneBy(options);

    if (user) {
      return user;
    }

    throw new BusinessException({
      name: 'NOT_FOUND',
      message: 'User not found',
    });
  }

  async getAll(): Promise<TEntity[]> {
    return this._repositoryORM.find();
  }

  async getOne(filter: Partial<TEntity>): Promise<TEntity | null> {
    const items = await this.getMany(filter);
    const item = items.length > 0 ? items[0] : null;

    return item;
  }

  async getMany(filter: Partial<TEntity>): Promise<TEntity[]> {
    const options: FindManyOptions<TEntity> = {
      where: {
        ...(filter as any),
      },
    };
    const items = this._repositoryORM.find(options);

    return items;
  }

  async delete(id: TEntity['id']): Promise<void> {
    const entity = await this.getById(id);

    await this._repositoryORM.remove(entity);
  }
}
