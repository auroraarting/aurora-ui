// lib/rateLimitedFetch.ts
import Bottleneck from "bottleneck";
// import IORedis from "ioredis";

// const redis = new IORedis(
// 	"redis://default:aKAwsBVnsChBew7oL7yC+LLsHDTWHZHDvRzOD8aOUk+/ivR8/xMGWJmlfZArYD+8A436NkfKd5J/0IYY@64.227.145.242:6379",
// 	{ tls: { rejectUnauthorized: false } }
// );

const limiter = new Bottleneck({
	maxConcurrent: 3, // Allow up to 3 requests in parallel
	minTime: 0, // No enforced delay between requests
	reservoir: 3, // 3 requests per interval
	reservoirRefreshAmount: 3, // Refill 3 requests
	reservoirRefreshInterval: 1000, // Every 1 second
	// datastore: "ioredis",
	// clearDatastore: false,
	// clientOptions: {}, // Not used with ioredis, but required by Bottleneck
	// Redis: redis,
});

/** rateLimitedFetch  */
export async function rateLimitedFetch(url: string, options: RequestInit = {}) {
	return limiter.schedule(() => fetch(url, options));
}
