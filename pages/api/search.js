/* eslint-disable require-jsdoc */
import { searchData } from "@/services/Search.service";
import { ServerHeaders } from "@/utils/RequestHeaders";

export default async function handler(req, res) {
	const { searchTerm } = JSON.parse(req.body);
	try {
		const response = await searchData(searchTerm);

		// if (!response.ok) {
		// 	throw new Error(`HTTP error! Status: ${response.status}`);
		// }

		// const { data } = await response.json();
		const results = response; // Combine results
		res.status(200).json(results);
	} catch (error) {
		console.error("Error fetching search results:", error);
		res.status(500).json({ error: "Failed to fetch search results" });
	}
}
