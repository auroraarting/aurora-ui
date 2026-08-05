const RESTAPI = async (query, options) => {
	const res = await fetch(`${process.env.BATTERY_BENCHMARK_API_URL}${query}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Private-Token": process.env.BATTERY_BENCHMARK_TOKEN,
		},
		...options,
	});
	const data = await res.json();
	return data;
};

/** Fetch the region codes the benchmark API has data for, e.g. ["gbr", "deu"].
 *  Returns an empty list on failure so the page still renders its full market
 *  list instead of failing the build. */
export const getAllRegions = async () => {
	const query = "/regions/all";
	try {
		const res = await RESTAPI(query);
		return res?.data || [];
	} catch (error) {
		console.error("getAllRegions failed:", error?.message || error);
		return [];
	}
};
