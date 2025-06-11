import { rateLimitedFetch } from "@/lib/rateLimitedFetch.server";
import { memoizedFetch } from "@/lib/memoizedFetch";
import { ServerHeaders } from "@/utils/RequestHeaders";

/** GraphQLAPI  */
export default async function GraphQLAPI(query, ttl = 86400) {
	let res;
	let req;
	try {
		const options = {
			...ServerHeaders,
			body: JSON.stringify({ query }),
			method: "POST",
		};

		req = await memoizedFetch(`${process.env.API_URL}`, options, ttl);
		// res = await req.json();
		return req;
	} catch (error) {
		// req = await req.text();
		console.log(error, req, "errror");
	}
}

/** GraphQLAPI Memoized (Redis cache) */
export async function GraphQLAPIMemoized(query, ttl = 86400) {
	// default 24h
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
export async function GraphQLAPINoBottleneck(query, ttl = 86400) {
	let res;
	let req;

	try {
		req = await memoizedFetch(
			`${process.env.API_URL}`,
			{
				...ServerHeaders,
				body: JSON.stringify({ query }),
				next: { revalidate: 60 },
			},
			ttl
		);
		// res = await req.json();
		return req;
	} catch (error) {
		// req = await req.text();
		console.log(error, req, "errror");
	}
}
