import { Entity } from './entity.interface';

export abstract class Repository<
  TEntity extends Entity<TPrimaryKey>,
  TPrimaryKey,
> {
  abstract create(data: TEntity): Promise<TEntity>;
  abstract update(id: TPrimaryKey, data: TEntity): Promise<TEntity>;
  abstract patch(id: TPrimaryKey, data: Partial<TEntity>): Promise<TEntity>;
  abstract getById(id: TPrimaryKey): Promise<TEntity>;
  abstract getAll(): Promise<TEntity[]>;
  abstract getOne(filter: Partial<TEntity>): Promise<TEntity>;
  abstract getMany(filter: Partial<TEntity>): Promise<TEntity[]>;
  abstract delete(id: TPrimaryKey): Promise<void>;
}
