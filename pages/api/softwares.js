/* eslint-disable require-jsdoc */
import {
	fetchNavigationData,
	getSoftwares,
} from "@/services/Navigation.service";
import { searchData } from "@/services/Search.service";
import { ServerHeaders } from "@/utils/RequestHeaders";

export default async function handler(req, res) {
	try {
		const response = await getSoftwares();

		const results = response; // Combine results
		res.status(200).json(results);
	} catch (error) {
		console.error("Error fetching search results:", error);
		res.status(500).json({ error: "Failed to fetch search results" });
	}
}
