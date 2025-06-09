// lib/rateLimitedFetch.ts
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
	maxConcurrent: 3, // Allow up to 3 requests in parallel
	minTime: 0, // No enforced delay between requests
	reservoir: 3, // 3 requests per interval
	reservoirRefreshAmount: 3, // Refill 3 requests
	reservoirRefreshInterval: 1000, // Every 1 second
});

/** rateLimitedFetch  */
export async function rateLimitedFetch(url: string, options: RequestInit = {}) {
	return limiter.schedule(() => fetch(url, options));
}
