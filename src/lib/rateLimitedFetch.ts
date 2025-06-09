// lib/rateLimitedFetch.ts
import Bottleneck from "bottleneck";
import IORedis from "ioredis";

const redis = new IORedis(
	"redis://default:TSy692fg7tnqS8LLFd2rFfnsF2mDFDYI@redis-17052.c243.eu-west-1-3.ec2.redns.redis-cloud.com:17052",
	{ tls: { rejectUnauthorized: false } }
);

const limiter = new Bottleneck({
	maxConcurrent: 3, // Allow up to 3 requests in parallel
	minTime: 0, // No enforced delay between requests
	reservoir: 3, // 3 requests per interval
	reservoirRefreshAmount: 3, // Refill 3 requests
	reservoirRefreshInterval: 1000, // Every 1 second
	datastore: "ioredis",
	clearDatastore: false,
	clientOptions: {}, // Not used with ioredis, but required by Bottleneck
	Redis: redis,
});

/** rateLimitedFetch  */
export async function rateLimitedFetch(url: string, options: RequestInit = {}) {
	return limiter.schedule(() => fetch(url, options));
}
