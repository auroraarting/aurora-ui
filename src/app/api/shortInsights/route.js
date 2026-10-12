// Force this route to run fresh on every request — no Next.js route cache,
// no Data Cache for its fetch() calls.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { searchData } from "@/services/Search.service";
import { ServerHeaders } from "@/utils/RequestHeaders";

export async function GET(req, res) {
	try {
		const [categoriesForSelect, list] = await Promise.all([
			getInsightsCategories(),
			getInsights(
				'first: 3, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}'
			),
		]);
		const defaultList = list?.data?.posts?.nodes;
		const countries = categoriesForSelect.data.countries.nodes;
		return Response.json({ data: defaultList, countries });
	} catch (error) {
		console.error("Error fetching insights results:", error);
		return new Response(`Webhook error: ${error.message}`, {
			status: 500,
		});
	}
}
