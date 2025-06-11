import { rateLimitedFetch } from "@/lib/rateLimitedFetch.server";
import { memoizedFetch } from "@/lib/memoizedFetch";
import { ServerHeaders } from "@/utils/RequestHeaders";

/** GraphQLAPI with support for variables */
export default async function GraphQLAPI(query, variables = {}) {
	try {
		const req = await fetch(`${process.env.API_URL}`, {
			...ServerHeaders,
			body: JSON.stringify({ query, variables }), // ✅ Send variables
			next: { revalidate: 60 },
		});
		const res = await req.json();
		return res;
	} catch (error) {
		console.log("GraphQLAPI error:", error);
	}
}

/** GraphQLAPI with support for variables */
export async function GraphQLAPILongerRevalidate(query, variables = {}) {
	try {
		const req = await fetch(`${process.env.API_URL}`, {
			...ServerHeaders,
			body: JSON.stringify({ query, variables }), // ✅ Send variables
			next: { revalidate: 60 }, // 24 hours
		});
		const res = await req.json();
		return res;
	} catch (error) {
		console.log("GraphQLAPI error:", error);
	}
}



/** GraphQLAPI with memoized Redis cache */
export async function GraphQLAPIMemoized(query, variables = {}, ttl = 86400) { // default 24h
    try {
        const options = {
            ...ServerHeaders,
            body: JSON.stringify({ query, variables }),
            method: "POST",
        };
        const res = await memoizedFetch(`${process.env.API_URL}`, options, ttl);
        return res;
    } catch (error) {
        console.log("GraphQLAPIMemoized error:", error);
    }
}
