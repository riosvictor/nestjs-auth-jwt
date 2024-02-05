import { Injectable } from '@nestjs/common';
import { IRepository } from '@/domain/interfaces';
import { BusinessException } from '@/domain/exceptions/bussiness.exception';

@Injectable()
export class RepositoryInMemory<TEntity> extends IRepository<TEntity, any> {
  protected readonly items: TEntity[];

  constructor(private readonly fieldKeyName = 'id') {
    super();
    this.items = [];
  }

  async create(data: TEntity): Promise<TEntity> {
    data[this.fieldKeyName] = crypto.randomUUID();

    const count = this.items.push(data);
    return this.items[count - 1];
  }

  async update(id: any, data: TEntity): Promise<TEntity> {
    const index = this._getIndexById(id);

    this._checkIndex(index);

    this.items[index] = data;

    return this.items[index];
  }

  async patch(id: any, data: Partial<TEntity>): Promise<TEntity> {
    const index = this._getIndexById(id);

    this._checkIndex(index);

    this.items[index] = { ...this.items[index], ...data };

    return this.items[index];
  }

  async getById(id: any): Promise<TEntity> {
    const item = this.items.find((item) => item[this.fieldKeyName] === id);

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

  async delete(id: any): Promise<void> {
    const index = this._getIndexById(id);

    this._checkIndex(index);

    this.items.splice(index, 1);
  }

  private _getIndexById(id: any): number {
    return this.items.findIndex((item) => item[this.fieldKeyName] === id);
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
