import { rateLimitedFetch } from "@/lib/rateLimitedFetch.server";
import { ServerHeaders } from "@/utils/RequestHeaders";

/** GraphQLAPI  */
export default async function GraphQLAPI(query) {
	let res;
	let req;
	try {
		req = await rateLimitedFetch(`${process.env.API_URL}`, {
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
