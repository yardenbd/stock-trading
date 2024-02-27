import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCache(
    key: string,
    value: string | number | { message: string; data: number },
  ) {
    await this.cacheManager.set(key, value);
  }

  async getCache<T>(key: string): Promise<T | null> {
    return this.cacheManager.get<T>(key);
  }
}
