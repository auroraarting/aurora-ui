// Force this route to run fresh on every request — no Next.js route cache,
// no Data Cache for its fetch() calls.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/* eslint-disable quotes */
import redisClient from "@/lib/redis";

/** Redis */
export async function GET(req, res) {
	try {
		const data = await redisClient.get(`getInsights:{"filterString":""}`);
		return Response.json(JSON.parse(data));
	} catch (error) {
		console.error("Error fetching search results:", error);
		return new Response(`Webhook error: ${error.message}`, {
			status: 500,
		});
	}
}
