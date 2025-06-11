import Redis from 'ioredis';

// Interface for cache (Single Responsibility, Dependency Inversion)
class ICache {
  async get(key) { throw new Error('Not implemented'); }
  async set(key, value, ttl) { throw new Error('Not implemented'); }
}

// Redis cache implementation (Open/Closed, Liskov Substitution)
export class RedisCache extends ICache {
  /**
   * @param {Redis.Redis} redisClient
   * @param {number} defaultTTL - in seconds
   */
  constructor(redisClient, defaultTTL = 60) {
    super();
    this.redis = redisClient;
    this.defaultTTL = defaultTTL;
  }

  async get(key) {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key, value, ttl = this.defaultTTL) {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
  }
}

// Key generator (Single Responsibility)
export function generateCacheKey(url, options = {}) {
  // You can enhance this to include headers, body, etc.
  return `fetch:${url}:${JSON.stringify(options)}`;
}

// Memoized fetch (Single Responsibility, Dependency Inversion)
export function createMemoizedFetch(fetchFn, cache) {
  return async function memoizedFetch(url, options = {}, ttl) {
    const key = generateCacheKey(url, options);
    const cached = await cache.get(key);
    if (cached) return cached;

    const response = await fetchFn(url, options);
    // Assume JSON response; adapt as needed
    const data = await response.json();
    await cache.set(key, data, ttl);
    return data;
  };
}

// Usage Example (Separation of Concerns)
// const redisClient = new Redis("redis://default:aKAwsBVnsChBew7oL7yC+LLsHDTWHZHDvRzOD8aOUk+/ivR8/xMGWJmlfZArYD+8A436NkfKd5J/0IYY@64.227.145.242:6379/0");
const redisClient = new Redis({
  host: '64.227.145.242',
  port: 6379,
//   username: 'default',
  password: 'aKAwsBVnsChBew7oL7yC+LLsHDTWHZHDvRzOD8aOUk+/ivR8/xMGWJmlfZArYD+8A436NkfKd5J/0IYY',
  db: 0,
});
const cache = new RedisCache(redisClient, 300); // 5 min default TTL
export const memoizedFetch = createMemoizedFetch(fetch, cache);

// Optionally, close Redis connection on shutdown
// process.on('SIGINT', () => {
//   redisClient.quit();
// });