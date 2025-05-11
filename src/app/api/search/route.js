/* eslint-disable require-jsdoc */
import { searchData } from "@/services/Search.service";
import { ServerHeaders } from "@/utils/RequestHeaders";

export async function GET(req, res) {
	const { searchTerm } = JSON.parse(req.body);
	try {
		const response = await searchData(searchTerm);

		// if (!response.ok) {
		// 	throw new Error(`HTTP error! Status: ${response.status}`);
		// }

		const results = response; // Combine results
		return Response.json(results);
	} catch (error) {
		console.error("Error fetching search results:", error);
		return new Response(`Webhook error: ${error.message}`, {
			status: 500,
		});
	}
}
