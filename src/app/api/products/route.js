/* eslint-disable require-jsdoc */
import {
	fetchNavigationData,
	getProducts,
} from "@/services/Navigation.service";
import { searchData } from "@/services/Search.service";
import { ServerHeaders } from "@/utils/RequestHeaders";

export async function GET(req, res) {
	try {
		const response = await getProducts();
		const results = response; // Combine results
		return Response.json(results);
	} catch (error) {
		console.error("Error fetching search results:", error);
		return new Response(`Webhook error: ${error.message}`, {
			status: 500,
		});
	}
}
