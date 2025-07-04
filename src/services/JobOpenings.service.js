/** FetchJobData  */
export async function getFetchJobData() {
	try {
		const res = await fetch("https://auroraer.pinpointhq.com/postings.json");
		const json = await res.json();
		const tempCountries = [
			...new Set(
				json.data.map(
					(item) => item?.location?.name.split(", ")[1] || item?.location?.name || ""
				)
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
