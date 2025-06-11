import { rateLimitedFetch } from "@/lib/rateLimitedFetch.server";
import { memoizedFetch } from "@/lib/memoizedFetch";
import { ServerHeaders } from "@/utils/RequestHeaders";

/** GraphQLAPI  */
export default async function GraphQLAPI(query) {
	let res;
	let req;
	try {
		req = await fetch(`${process.env.API_URL}`, {
			...ServerHeaders,
			body: JSON.stringify({ query }),
			next: { revalidate: 60 },
		});
		res = await req.json();
		return res;
	} catch (error) {
		// req = await req.text();
		console.log(error, req, "errror");
	}
}


/** GraphQLAPI Memoized (Redis cache) */
export async function GraphQLAPIMemoized(query, ttl = 86400) { // default 24h
    let res;
    try {
        const options = {
            ...ServerHeaders,
            body: JSON.stringify({ query }),
            method: "POST",
        };
        res = await memoizedFetch(`${process.env.API_URL}`, options, ttl);
        return res;
    } catch (error) {
        console.log(error, "GraphQLAPIMemoized error");
    }
}


/** GraphQLAPI  */
export async function GraphQLAPINoBottleneck(query) {
	let res;
	let req;

	try {
		req = await fetch(`${process.env.API_URL}`, {
			...ServerHeaders,
			body: JSON.stringify({ query }),
			next: { revalidate: 60 },
		});
		res = await req.json();
		return res;
	} catch (error) {
		// req = await req.text();
		console.log(error, req, "errror");
	}
}
