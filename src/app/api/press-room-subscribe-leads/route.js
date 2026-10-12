// Force this route to run fresh on every request — no Next.js route cache,
// no Data Cache for its fetch() calls.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/* eslint-disable require-jsdoc */
import { searchData } from "@/services/Search.service";
import { ServerHeaders } from "@/utils/RequestHeaders";

export async function POST(req) {
	const { data } = await req.json(); // get the `data` object

	try {
		const response = await fetch(process.env.PRESS_ROOM_SUBSCRIBE_FORM_API, {
			method: "POST",
			headers: ServerHeaders.headers,
			body: JSON.stringify({
				...data,
			}),
		});
		return Response.json(response);
	} catch (error) {
		return new Response(`Webhook error: ${error.message}`, {
			status: 500,
		});
	}

	// try {
	// 	const response = await fetch(process.env.CONTACT_FORM_API);
	// 	return Response.json(response);
	// } catch (error) {
	// 	console.error("Error fetching search results:", error);
	// 	return new Response(`Webhook error: ${error.message}`, {
	// 		status: 500,
	// 	});
	// }
}
