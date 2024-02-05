import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { IRepository } from '@/domain/interfaces';
import { BusinessException } from '@/domain/exceptions/bussiness.exception';

@Injectable()
export class RepositoryTypeOrm<TEntity> extends IRepository<TEntity, any> {
  constructor(
    private readonly _repositoryORM: Repository<TEntity>,
    private readonly fieldKeyName = 'id',
  ) {
    super();
  }

  async create(data: TEntity): Promise<TEntity> {
    data[this.fieldKeyName] = crypto.randomUUID();

    const user = await this._repositoryORM.save(data);
    return user;
  }

  async update(id: any, data: TEntity): Promise<TEntity> {
    const entity = await this.getById(id);
    const updatedProps = {
      [this.fieldKeyName]: entity[this.fieldKeyName],
      ...data,
    };
    const entityUpdated = await this._repositoryORM.save(updatedProps);

    return entityUpdated;
  }

  async patch(id: any, data: Partial<TEntity>): Promise<TEntity> {
    const entity = await this.getById(id);
    const updatedProps = {
      ...entity,
      ...data,
    };
    const entityUpdated = await this._repositoryORM.save(updatedProps);

    return entityUpdated;
  }

  async getById(id: any): Promise<TEntity> {
    const options: FindOptionsWhere<TEntity> = {
      [this.fieldKeyName]: id,
    } as any;
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

  async delete(id: any): Promise<void> {
    const entity = await this.getById(id);

    await this._repositoryORM.remove(entity);
  }
}
