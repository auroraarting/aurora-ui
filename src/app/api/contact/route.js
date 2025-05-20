/* eslint-disable require-jsdoc */
import { searchData } from "@/services/Search.service";
import { ServerHeaders } from "@/utils/RequestHeaders";

export async function POST(req) {
	const { data } = await req.json(); // get the `data` object
	const { name } = data; // now get `name` from inside it

	try {
		const response = await fetch(process.env.CONTACT_FORM_API, {
			method: "POST",
			body: JSON.stringify({
				...data,
			}),
            
		});
		console.log(response, "name");
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
