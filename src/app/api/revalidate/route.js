/* eslint-disable require-jsdoc */
import { revalidateTag } from "next/cache";

export async function GET(req, res) {
	try {
		revalidateTag("alldata");
		return Response.json({ msg: "Revalidateed all data" });
	} catch (error) {
		console.error("Error fetching search results:", error);
		return new Response(`Webhook error: ${error.message}`, {
			status: 500,
		});
	}
}
