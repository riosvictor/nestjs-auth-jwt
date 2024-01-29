export class MemoryCache {
  private _cache: any;

  constructor() {
    this._cache = {};
  }

  async get(key) {
    return this._cache[key];
  }

  async set(key, value) {
    this._cache[key] = value;
  }

  async del(key) {
    delete this._cache[key];
  }

  async reset() {
    this._cache = {};
  }
}
