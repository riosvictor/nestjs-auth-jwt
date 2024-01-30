import { Injectable } from '@nestjs/common';
import { Entity, Repository } from '@/domain/interfaces';
import { longRunningOperation } from '@/common/utils/simulate-actions';

@Injectable()
export class RepositoryCacheMemory<
  TEntity extends Entity<TEntity['id']>,
> extends Repository<TEntity, TEntity['id']> {
  protected readonly items: TEntity[];

  constructor() {
    super();
    this.items = [];
  }

  async create(data: TEntity): Promise<TEntity> {
    data.id = crypto.randomUUID();

    const count = this.items.push(data);
    return this.items[count - 1];
  }

  async update(id: TEntity['id'], data: TEntity): Promise<TEntity> {
    const index = this._getIndexById(id);

    if (index === -1) {
      throw new Error('Not found');
    }

    this.items[index] = data;

    return this.items[index];
  }

  async patch(id: TEntity['id'], data: Partial<TEntity>): Promise<TEntity> {
    const index = this._getIndexById(id);

    if (index === -1) {
      throw new Error('Not found');
    }

    this.items[index] = { ...this.items[index], ...data };

    return this.items[index];
  }

  async getById(id: TEntity['id']): Promise<TEntity> {
    const item = this.items.find((item) => item.id === id);

    return item;
  }

  async getAll(): Promise<TEntity[]> {
    await longRunningOperation(1500);

    return this.items;
  }

  async getOne(filter: Partial<TEntity>): Promise<TEntity | null> {
    const items = await this.getMany(filter);
    const item = items.length > 0 ? items[0] : null;

    return item;
  }

  async getMany(filter: Partial<TEntity>): Promise<TEntity[]> {
    const items = this.items.filter((item) => {
      return Object.keys(filter).every((key) => item[key] === filter[key]);
    });

    return items;
  }

  async delete(id: TEntity['id']): Promise<void> {
    const index = this._getIndexById(id);

    if (index === -1) {
      throw new Error('Not found');
    }

    this.items.splice(index, 1);
  }

  private _getIndexById(id: TEntity['id']): number {
    return this.items.findIndex((item) => item.id === id);
  }
}
