// lib/rateLimitedFetch.ts
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
	maxConcurrent: 3, // One request at a time
	minTime: 0, // 20s delay between requests (3/min)
	reservoir: 3, // 3 requests
	reservoirRefreshAmount: 3,
	reservoirRefreshInterval: 1000, // every minute
});

/** rateLimitedFetch  */
export async function rateLimitedFetch(url: string, options: RequestInit = {}) {
	return limiter.schedule(() => fetch(url, options));
}
