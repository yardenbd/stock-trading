import { Cache } from 'cache-manager';
export declare class CacheService {
    private cacheManager;
    constructor(cacheManager: Cache);
    setCache(key: string, value: string | number | {
        message: string;
        data: number;
    }): Promise<void>;
    getCache<T>(key: string): Promise<T | null>;
}
