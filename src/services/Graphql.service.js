import { ClientHeaders, ServerHeaders } from "@/utils/RequestHeaders";

/** GraphQLAPI  */
export default async function GraphQLAPI(query) {
	try {
		const req = await fetch(`${process.env.API_URL}`, {
			...ServerHeaders,
			body: JSON.stringify({ query }),
		});
		const res = await req.json();
		return res;
	} catch (error) {
		console.log(error);
	}
}
