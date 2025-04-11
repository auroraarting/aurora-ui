/** formatDate  */
export default function formatDate(isoString) {
	const date = new Date(isoString);
	const options = { month: "short", day: "numeric", year: "numeric" };
	return date.toLocaleDateString("en-US", options);
}

/** getClientLogosForAllProducts  */
export function getClientLogosForAllProducts(data) {
	const filteredNodes = data.nodes.filter((node) => {
		return node.clientsLogos?.selectProducts?.nodes?.length > 0;
	});

	return { nodes: filteredNodes };
}

/** getClientLogosForAllProducts  */
export function getTestimonialsForAllProducts(data) {
	const filteredNodes = data.nodes.filter((node) => {
		return (
			node.testimonials?.relatedTo?.nodes?.length > 0 &&
			node.testimonials?.relatedTo?.nodes?.[0].id
		);
	});

	return { nodes: filteredNodes };
}

/** helper to safely access nested keys like 'testimonials.designation'  */
function getNestedValue(obj, path) {
	return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

/** removeDuplicatesByKeys  */
export function removeDuplicatesByKeys(arr, keys) {
	const seen = new Set();
	return arr.filter((obj) => {
		const key = keys.map((k) => getNestedValue(obj, k)).join("|");
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

/** getMapJsonForProducts  */
export function getMapJsonForProducts(regions) {
	const mapJson = [];
	regions?.data?.regions?.nodes?.map((item) => {
		item.countries.nodes.map((item2) => {
			let obj = {
				centerOfCountry: { lat: 18.1307561, lng: 23.554042 },
				markers: item2.countries.map?.markers?.filter((item3) => {
					let obj2 = {
						name: "",
						lat: "",
						lng: "",
						url: "",
						hoverImg: "",
						icon: item3.icon.node.sourceUrl,
					};

					if (item3?.mapThumbnail?.node?.sourceUrl) {
						obj2.hoverImg = item3.mapThumbnail.node.sourceUrl;
					}

					if (item3.category.nodes.length > 0) {
						let node = item3.category.nodes[0];

						if (node.contentType.node.name != "products") {
							return;
						}
						obj2.name = node.title;
						obj2.lat = parseFloat(item3.coordinates.lat);
						obj2.lng = parseFloat(item3.coordinates.lng);
						obj2.url = `/${node.contentType.node.name}/${node.slug}`;
					}

					return obj2;
				}),
				zoom: item2.countries.map.zoom,
				name: item2.title,
			};

			mapJson.push(obj);
		});
	});
	return mapJson;
}

/** getMapJsonForProducts  */
export function getMapJsonForSoftware(regions) {
	const mapJson = [];
	regions?.data?.regions?.nodes?.map((item) => {
		item.countries.nodes.map((item2) => {
			let obj = {
				centerOfCountry: { lat: 18.1307561, lng: 23.554042 },
				markers: item2.countries.map?.markers?.filter((item3) => {
					let obj2 = {
						name: "",
						lat: "",
						lng: "",
						url: "",
						hoverImg: "",
						icon: item3.icon.node.sourceUrl,
					};

					if (item3?.mapThumbnail?.node?.sourceUrl) {
						obj2.hoverImg = item3.mapThumbnail.node.sourceUrl;
					}

					if (item3.category.nodes.length > 0) {
						let node = item3.category.nodes[0];

						if (node.contentType.node.name != "softwares") {
							return;
						}
						obj2.name = node.title;
						obj2.lat = parseFloat(item3.coordinates.lat);
						obj2.lng = parseFloat(item3.coordinates.lng);
						obj2.url = `/${node.contentType.node.name}/${node.slug}`;
					}

					return obj2;
				}),
				zoom: item2.countries.map.zoom,
				name: item2.title,
			};

			mapJson.push(obj);
		});
	});
	return mapJson;
}
