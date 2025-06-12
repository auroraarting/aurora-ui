import { rateLimitedFetch } from "@/lib/rateLimitedFetch.server";
import { ServerHeaders } from "@/utils/RequestHeaders";
// import memoizedFetch from "@/lib/memoizedFetch";

/** GraphQLAPI  */
export default async function GraphQLAPI(query, ttl = 86400) {
	let res;
	let req;
	try {
		// const options = {
		// 	...ServerHeaders,
		// 	body: JSON.stringify({ query }),
		// 	method: "POST",
		// };

		// req = await memoizedFetch(`${process.env.API_URL}`, options, ttl);
		// // res = await req.json();
		// return req;

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

/** GraphQLAPI  */
export async function GraphQLAPINoBottleneck(query, ttl = 86400) {
	let res;
	let req;

	try {
		// const options = {
		// 	...ServerHeaders,
		// 	body: JSON.stringify({ query }),
		// 	method: "POST",
		// };

		// req = await memoizedFetch(`${process.env.API_URL}`, options, ttl);
		// return req;

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

/** GraphQLAPI  */
export async function GraphQLAPILongerRevalidate(query, ttl = 86400) {
	let res;
	let req;
	try {
		// const options = {
		// 	...ServerHeaders,
		// 	body: JSON.stringify({ query }),
		// 	method: "POST",
		// };

		// req = await memoizedFetch(`${process.env.API_URL}`, options, ttl);
		// return req;

		req = await fetch(`${process.env.API_URL}`, {
			...ServerHeaders,
			body: JSON.stringify({ query }),
			next: { revalidate: 18000 }, // 5 minutes
		});
		res = await req.json();
		return res;
	} catch (error) {
		// req = await req.text();
		console.log(error, req, "errror");
	}
}
