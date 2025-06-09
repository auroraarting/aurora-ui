// lib/rateLimitedFetch.ts
import Bottleneck from "bottleneck";
import IORedis from "ioredis";

// const redis = new IORedis(
// 	"redis://default:aKAwsBVnsChBew7oL7yC+LLsHDTWHZHDvRzOD8aOUk+/ivR8/xMGWJmlfZArYD+8A436NkfKd5J/0IYY@64.227.145.242:6379"
// );

// const limiter = new Bottleneck({
// 	maxConcurrent: 3, // Allow up to 3 requests in parallel
// 	minTime: 0, // No enforced delay between requests
// 	reservoir: 3, // 3 requests per interval
// 	reservoirRefreshAmount: 3, // Refill 3 requests
// 	reservoirRefreshInterval: 1000, // Every 1 second
// 	datastore: "ioredis",
// 	clearDatastore: false,
// 	clientOptions: {}, // Not used with ioredis, but required by Bottleneck
// 	Redis: redis,
// });

// const limiter = new Bottleneck({
// 	/* Some basic options */
// 	maxConcurrent: 5,
// 	minTime: 500,
// 	id: "my-super-app", // All limiters with the same id will be clustered together

// 	/* Clustering options */
// 	datastore: "redis", // or "ioredis"
// 	clearDatastore: false,
// 	clientOptions: {
// 		host: "64.227.145.242",
// 		port: 6379,
// 		password:
// 			"aKAwsBVnsChBew7oL7yC+LLsHDTWHZHDvRzOD8aOUk+/ivR8/xMGWJmlfZArYD+8A436NkfKd5J/0IYY",
// 		// Redis client options
// 		// Using NodeRedis? See https://github.com/NodeRedis/node_redis#options-object-properties
// 		// Using ioredis? See https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options
// 	},
// });

if (typeof window !== "undefined") {
	throw new Error("rateLimitedFetch must not be used in the browser.");
}

// Connect to Redis running in your VM (change host/port as needed)
const redisClient = new IORedis({
	host: "127.0.0.1", // or your VM IP
	port: 6379,
	password: "", // if required
	enableOfflineQueue: false,
});

// Create a Bottleneck group backed by Redis
const limiter = new Bottleneck({
	id: "global-api-limiter",
	maxConcurrent: 1,
	minTime: 1000 * 20, // minimum time between requests (e.g. 20s per request)
	datastore: "ioredis",
	clearDatastore: false,
	clientOptions: {
		client: redisClient,
	},
});

limiter.on("queued", (info) => {
	console.log("Queued request", info.options.id);
});

/** rateLimitedFetch  */
export async function rateLimitedFetch(url: string, options: RequestInit = {}) {
	return limiter.schedule(() => fetch(url, options));
}
