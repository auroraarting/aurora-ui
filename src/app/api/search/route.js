// Force this route to run fresh on every request — no Next.js route cache,
// no Data Cache for its fetch() calls.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/* eslint-disable require-jsdoc */
import { searchData } from "@/services/Search.service";
import { ServerHeaders } from "@/utils/RequestHeaders";

export async function POST(req) {
	const { searchTerm } = await req.json();

	try {
		const response = await searchData(searchTerm);
		return Response.json(response);
	} catch (error) {
		console.error("Error fetching search results:", error);
		return new Response(`Webhook error: ${error.message}`, {
			status: 500,
		});
	}
}
