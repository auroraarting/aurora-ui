/* eslint-disable quotes */
import redisClient from "@/lib/redis";

/** Redis */
export async function GET(req, res) {
	try {
		const data = await redisClient.get(`getInsights:{"filterString":""}`);
		console.log(data);
		return Response.json(JSON.parse(data));
	} catch (error) {
		console.error("Error fetching search results:", error);
		return new Response(`Webhook error: ${error.message}`, {
			status: 500,
		});
	}
}
