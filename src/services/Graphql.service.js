import { rateLimitedFetch } from "@/lib/rateLimitedFetch.server";
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

/** GraphQLAPI  */
export async function GraphQLAPILongerRevalidate(query) {
	let res;
	let req;
	try {
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
