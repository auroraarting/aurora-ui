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

/** Fetch Page */
export const getAllRegions = async (slug) => {
	const query = "/regions/all";
	const res = await RESTAPI(query);
	return res?.data;
};
