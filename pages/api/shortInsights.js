/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { searchData } from "@/services/Search.service";
import { ServerHeaders } from "@/utils/RequestHeaders";

export default async function handler(req, res) {
	try {
		const [categoriesForSelect, list] = await Promise.all([
			getInsightsCategories(),
			getInsights('first: 3, where: {categoryName: ""}'),
		]);
		const defaultList = list?.data?.posts?.nodes;
		const countries = categoriesForSelect.data.countries.nodes;
		res.status(200).json({ data: defaultList, countries });
	} catch (error) {
		console.error("Error fetching insights results:", error);
		res.status(500).json({ error: "Failed to fetch insights results" });
	}
}
