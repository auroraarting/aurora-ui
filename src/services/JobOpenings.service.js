/** FetchJobData  */
export async function getFetchJobData() {
	try {
		const locationsRes = await fetch(
			"https://auroraer.pinpointhq.com/api/v1/locations",
			{
				method: "GET",
				headers: {
					accept: "application/vnd.api+json",
					"X-API-KEY": "8fVk9JMBsKbkHxEQUsGLesQf",
				},
			}
		);
		const res = await fetch("https://auroraer.pinpointhq.com/postings.json");
		const json = await res.json();
		const locationsJson = await locationsRes.json();

		console.log(locationsJson, "locationsJson");
		const tempCountries = [
			...new Set(
				// json.data.map(
				// 	(item) => item?.location?.name.split(", ")[1] || item?.location?.name || ""
				// )
				locationsJson?.data
					?.map(
						(item) =>
							item?.attributes?.name.split(", ")[1] || item?.attributes?.name || ""
					)
					?.sort((a, b) => a.localeCompare(b)) || []
			),
		].filter((item) => item);
		const tempDepartments = [
			...new Set(
				json.data.map(
					(item) =>
						item?.job?.department?.name?.split("/")[1] ||
						item?.job?.department?.name?.split("/")[0]
				)
			),
		].filter((item) => item);

		const data = {
			countries: tempCountries.sort((a, b) => a.localeCompare(b)),
			departments: tempDepartments.sort((a, b) => a.localeCompare(b)),
			jobs: json,
		};

		return data;
	} catch (error) {
		console.log(error, "json");
	}
}
