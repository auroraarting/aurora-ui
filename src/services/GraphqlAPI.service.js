import { ClientHeaders, ServerHeaders } from "@/utils/RequestHeaders";

/** GraphQLAPI with support for variables */
export default async function GraphQLAPI(query, variables = {}) {
	try {
		const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
			...ServerHeaders,
			body: JSON.stringify({ query, variables }), // ✅ Send variables
		});
		const res = await req.json();
		return res;
	} catch (error) {
		console.log("GraphQLAPI error:", error);
	}
}
