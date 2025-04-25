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

/** getMapJsonForCountries  */
export function getMapJsonForCountries(data) {
	let mapJson = {
		...data,
		centerOfCountry: {
			lat: parseFloat(data?.countryPin?.lat),
			lng: parseFloat(data?.countryPin?.lng),
		},
		markers: data?.markers
			?.map((markerItem) => {
				let node = markerItem?.category?.nodes[0];

				let obj = {
					unique: Math.random(),
					name: markerItem?.category?.nodes?.[0]?.title || "",
					lat: parseFloat(markerItem?.coordinates?.lat),
					lng: parseFloat(markerItem?.coordinates?.lng),
					url: `/${markerItem?.category?.nodes?.[0]?.contentType?.node?.name}/${markerItem?.category?.nodes?.[0]?.slug}`,
					icon:
						node?.service?.map?.logo?.node?.sourceUrl ||
						node?.products?.map?.logo?.node?.sourceUrl ||
						node?.softwares?.map?.logo?.node?.sourceUrl ||
						markerItem?.icon?.node?.sourceUrl ||
						"",
				};

				if (markerItem?.mapThumbnail) {
					obj.hoverImg = markerItem.mapThumbnail.node.sourceUrl;
				}
				if (markerItem?.icon?.node?.sourceUrl) {
					obj.icon = markerItem.icon.node.sourceUrl;
				}

				return obj;
			})
			.filter((item) => item),
	};

	// delete mapJson["countryPin"];
	return mapJson;
}

/** getMapJsonForProducts  */
export function getMapJsonForProducts(regions) {
	const mapJson = [];
	regions?.data?.regions?.nodes?.map((item) => {
		item?.countries?.nodes?.map((item2) => {
			let obj = {
				centerOfCountry: { lat: 18.1307561, lng: 23.554042 },
				markers: item2.countries?.map?.markers
					?.map((item3) => {
						let node = item3?.category?.nodes?.[0];

						let obj2 = {
							name: "",
							lat: "",
							lng: "",
							url: "",
							hoverImg: "",
							// icon: item3?.icon?.node?.sourceUrl,
							icon:
								node?.service?.map?.logo?.node?.sourceUrl ||
								node?.products?.map?.logo?.node?.sourceUrl ||
								node?.softwares?.map?.logo?.node?.sourceUrl ||
								item3?.icon?.node?.sourceUrl ||
								"",
							unique: Math.random(),
						};

						if (item3?.mapThumbnail?.node?.sourceUrl) {
							obj2.hoverImg = item3.mapThumbnail.node.sourceUrl;
						}

						if (item3?.category?.nodes?.length > 0) {
							if (node?.contentType?.node?.name != "products") {
								return;
							}
							obj2.name = node?.title;
							obj2.lat = parseFloat(item3?.coordinates?.lat);
							obj2.lng = parseFloat(item3?.coordinates?.lng);
							obj2.url = `/${node?.contentType?.node?.name}/${node?.slug}`;
						}

						return obj2;
					})
					.filter((item) => item),
				zoom: item2?.countries?.map?.zoom,
				name: item2?.title,
			};

			obj && mapJson.push(obj);
		});
	});

	return mapJson;
}

/** getMapJsonForProducts  */
export function getMapJsonForSoftware(regions) {
	const mapJson = [];
	regions?.data?.regions?.nodes?.map((item) => {
		item?.countries?.nodes?.map((item2) => {
			let obj = {
				centerOfCountry: { lat: 18.1307561, lng: 23.554042 },
				markers: item2.countries.map?.markers
					?.map((item3) => {
						let node = item3?.category?.nodes[0];

						let obj2 = {
							name: "",
							lat: "",
							lng: "",
							url: "",
							hoverImg: "",
							// icon: item3?.icon?.node?.sourceUrl,
							icon:
								node?.service?.map?.logo?.node?.sourceUrl ||
								node?.products?.map?.logo?.node?.sourceUrl ||
								node?.softwares?.map?.logo?.node?.sourceUrl ||
								item3?.icon?.node?.sourceUrl ||
								"",
							unique: Math.random(),
						};

						if (item3?.mapThumbnail?.node?.sourceUrl) {
							obj2.hoverImg = item3.mapThumbnail.node.sourceUrl;
						}

						if (item3?.category?.nodes?.length > 0) {
							if (node?.contentType?.node?.name != "softwares") {
								return;
							}
							obj2.name = node?.title;
							obj2.lat = parseFloat(item3?.coordinates?.lat);
							obj2.lng = parseFloat(item3?.coordinates?.lng);
							obj2.url = `/${node?.contentType?.node?.name}/${node?.slug}`;
						}

						return obj2;
					})
					.filter((item) => item),
				zoom: item2?.countries?.map?.zoom,
				name: item2?.title,
			};

			obj && mapJson.push(obj);
		});
	});
	return mapJson;
}

/** filterMarkersBySlug  */
export function filterMarkersBySlug(data, slug) {
	data.regions?.nodes.forEach((region) => {
		region.countries?.nodes.forEach((country) => {
			const markers = country.countries?.map?.markers || [];

			const filteredMarkers = markers.filter((marker) =>
				marker.category?.nodes?.some((cat) => cat.slug === slug)
			);

			if (country.countries?.map) {
				country.countries.map.markers = filteredMarkers;
			}
		});
	});

	return data;
}

/** getMapJsonForAllRegions  */
export function getMapJsonForAllRegions(regions) {
	const mapJson = [];
	regions?.data?.regions?.nodes?.map((item) => {
		item?.countries?.nodes?.map((item2) => {
			let markers = [];
			if (item2?.countries?.map?.markers) {
				markers = item2?.countries?.map?.markers?.map((item3) => {
					let node = item3?.category?.nodes?.[0];

					let obj2 = {
						name: "",
						lat: "",
						lng: "",
						url: "",
						hoverImg: "",
						icon:
							node?.service?.map?.logo?.node?.sourceUrl ||
							node?.products?.map?.logo?.node?.sourceUrl ||
							node?.softwares?.map?.logo?.node?.sourceUrl ||
							item3?.icon?.node?.sourceUrl,
						unique: Math.random(),
					};

					if (item3?.mapThumbnail?.node?.sourceUrl) {
						obj2.hoverImg = item3.mapThumbnail.node.sourceUrl;
					}

					if (item3?.category?.nodes?.length > 0) {
						obj2.name = node?.title;
						obj2.lat = parseFloat(item3?.coordinates?.lat);
						obj2.lng = parseFloat(item3?.coordinates?.lng);
						obj2.url = `/${node.contentType?.node?.name}/${node?.slug}`;
					}

					return obj2;
				});
			}
			let obj = {
				centerOfCountry: { lat: 18.1307561, lng: 23.554042 },
				markers: markers,
				zoom: item2?.countries?.map?.zoom || 4,
				name: item2?.title,
			};

			mapJson.push(obj);
		});
	});

	return mapJson;
}

/** transformQueryObject  */
export const transformQueryObject = (input, categories, countries, years) => {
	const output = {
		first: input.first,
		after: input.after,
		category: "",
		country: "",
		productService: "",
	};

	// Parse the "where" string safely
	const where = input.where ? JSON.parse(input.where) : {};
	const categoryNames = where.categoryName ? where.categoryName.split(",") : [];

	for (const word of categoryNames) {
		const trimmedWord = word.trim();

		if (categories.find((item) => item.title === trimmedWord)) {
			output.category = trimmedWord;
		} else if (countries.find((item) => item.title === trimmedWord)) {
			output.country = trimmedWord;
		} else {
			// If it doesn't match category or country, assume it's a product/service
			if (output.productService) {
				output.productService += `,${trimmedWord}`;
			} else {
				output.productService = trimmedWord;
			}
		}
	}

	// Extract year
	if (where.dateQuery && where.dateQuery.year) {
		output.year = 2001; // or use actual year: where.dateQuery.year
	}

	return output;
};

/** formatValue */
function formatValue(value) {
	// eslint-disable-next-line quotes
	if (value === "null") return `"null"`; // Handle string 'null'
	if (value === null) return "null"; // Handle actual null
	if (!isNaN(value) && typeof value !== "object") return value;
	return `"${value}"`;
}

/** objectToGraphQLArgs */
export function objectToGraphQLArgs(obj, isRoot = true) {
	if (typeof obj === "object" && obj !== null) {
		const fields = Object.entries(obj).map(([key, value]) => {
			// ✅ categoryIn must be a single quoted string of comma-separated values
			if (key === "categoryIn" && typeof value === "string") {
				const clean = value
					.split(",")
					.map((v) => v.trim())
					.join(", ");
				return `${key}: "${clean}"`;
			}

			// Default object formatting
			return `${key}: ${objectToGraphQLArgs(value, false)}`;
		});

		return isRoot ? fields.join(", ") : `{ ${fields.join(", ")} }`;
	}

	return formatValue(obj);
}

/** buildQueryFromContext  */
export function buildQueryFromContext(context) {
	const query = context;
	const queryToUse = {
		first: query.first || 10,
		after: query.after || "null",
	};

	const categoryInList = [];

	// Add all category-based filters
	["category", "country", "product", "software", "service", "search"].forEach(
		(key) => {
			if (query[key]) categoryInList.push(query[key]);
		}
	);

	// Construct `where` if needed
	if (categoryInList.length || query.year) {
		queryToUse.where = {};

		if (categoryInList.length) {
			queryToUse.where.categoryName = categoryInList.join(",");
		}

		if (query.year) {
			queryToUse.where.dateQuery = { year: query.year };
		}
	}

	return queryToUse;
}
