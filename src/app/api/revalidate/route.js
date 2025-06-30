/* eslint-disable require-jsdoc */
"use server";
import { revalidateTag } from "next/cache";

export async function GET(req, res) {
	try {
		await revalidateTag("alldata");
		return Response.json({ msg: "Revalidated all data" });
	} catch (error) {
		console.error("Error fetching search results:", error);
		return new Response(`Webhook error: ${error.message}`, {
			status: 500,
		});
	}
}
