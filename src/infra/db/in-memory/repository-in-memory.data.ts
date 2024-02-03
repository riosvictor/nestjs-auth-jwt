import { Injectable } from '@nestjs/common';
import { Entity } from '@/domain/interfaces';
import { IRepository } from '@/domain/interfaces';
import { BusinessException } from '@/domain/exceptions/bussiness.exception';

@Injectable()
export class RepositoryInMemory<
  TEntity extends Entity<TEntity['id']>,
> extends IRepository<TEntity, TEntity['id']> {
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

    this._checkIndex(index);

    this.items[index] = data;

    return this.items[index];
  }

  async patch(id: TEntity['id'], data: Partial<TEntity>): Promise<TEntity> {
    const index = this._getIndexById(id);

    this._checkIndex(index);

    this.items[index] = { ...this.items[index], ...data };

    return this.items[index];
  }

  async getById(id: TEntity['id']): Promise<TEntity> {
    const item = this.items.find((item) => item.id === id);

    return item;
  }

  async getAll(): Promise<TEntity[]> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return [...this.items];
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

    this._checkIndex(index);

    this.items.splice(index, 1);
  }

  private _getIndexById(id: TEntity['id']): number {
    return this.items.findIndex((item) => item.id === id);
  }

  private _checkIndex(index: number): void {
    if (index === -1) {
      throw new BusinessException({
        name: 'NOT_FOUND',
        message: 'Index not found',
      });
    }
  }
}
