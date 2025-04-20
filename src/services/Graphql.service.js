import { ClientHeaders, ServerHeaders } from "@/utils/RequestHeaders";

/** GraphQLAPI  */
export default async function GraphQLAPI(query) {
	try {
		const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
			...ClientHeaders,
			body: JSON.stringify({ query }),
		});
		const res = await req.json();
		return res;
	} catch (error) {
		console.log(error);
	}
}
