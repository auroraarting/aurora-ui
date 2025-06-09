// import Bottleneck from "bottleneck";

// const limiter = new Bottleneck({
// 	maxConcurrent: 3, // Allow up to 3 requests in parallel
// 	minTime: 0, // No enforced delay between requests
// 	reservoir: 3, // 3 requests per interval
// 	reservoirRefreshAmount: 3, // Refill 3 requests
// 	reservoirRefreshInterval: 1000, // Every 1 second
// });

// /** rateLimitedFetch  */
// export async function rateLimitedFetch(url: string, options: RequestInit = {}) {
// 	return limiter.schedule(() => fetch(url, options));
// }

// lib/rateLimitedFetch.ts
import Bottleneck from "bottleneck";
import IORedis from "ioredis";
import { v4 as uuidv4 } from "uuid";

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
// const redisClient = new IORedis({
// 	host: "64.227.145.242", // or your VM IP
// 	port: 17052,
// 	password: "TSy692fg7tnqS8LLFd2rFfnsF2mDFDYI", // if required
// 	enableOfflineQueue: false,
// 	lazyConnect: false, // Connect on first use
// 	reconnectOnError: () => true,
// });

// Create a Bottleneck group backed by Redis
const limiter = new Bottleneck({
	// id: "global-api-limiter",
	// datastore: "ioredis",
	// clearDatastore: false, // Don't clear in prod!
	// Redis: IORedis,
	// clientOptions: {
	// 	host: "redis-17052.c243.eu-west-1-3.ec2.redns.redis-cloud.com",
	// 	port: 17052,
	// 	password: "TSy692fg7tnqS8LLFd2rFfnsF2mDFDYI",
	// },
	// 💡 This allows up to 5 requests per 1000ms
	reservoir: 5, // max requests in a burst
	reservoirRefreshAmount: 5, // refill to 5
	reservoirRefreshInterval: 1000, // every 1000ms = 1s
	maxConcurrent: 5, // one at a time for safety
});

limiter.on("queued", (info) => {
	console.log("Queued request", info.options.id);
});
// redisClient.on("connect", () => {
// 	console.log("Redis connected!");
// });
// redisClient.on("error", (err) => {
// 	console.error("Redis error:", err);
// });
limiter.on("error", (err) => {
	console.error("Bottleneck error:", err);
});
limiter.on("failed", (error, jobInfo) => {
	console.error("Bottleneck job failed:", error, jobInfo);
});
limiter.on("debug", (msg) => {
	console.log("Bottleneck debug:", msg);
});
limiter.on("message", (msg) => {
	console.log(msg); // prints "this is a string"
});
limiter.on("executing", (info) => {
	console.log(`🚀 Executing: Job ${info.options.id}`);
});

/** rateLimitedFetch  */
// export async function rateLimitedFetch(url: string, options: RequestInit = {}) {
// 	return limiter.schedule(() => fetch(url, options));
// }

// Wrap native fetch
// export const rateLimitedFetch = limiter.wrap(fetch);

/** Rate-limited fetch  */
export const rateLimitedFetch = async (url: string, options?: RequestInit) => {
	const jobId = `job-${uuidv4()}`;
	console.time(jobId);
	const res = await limiter.schedule({ id: jobId }, () => fetch(url, options));
	console.timeEnd(jobId);
	return res;
};
