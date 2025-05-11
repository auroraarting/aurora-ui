import { openModal } from "@/components/Modal";
// import { Link, scroller } from "react-scroll";

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
							/** keyModule  */
							const keyModule = () => {
								if (node?.contentType?.node?.name === "softwares") {
									return "software";
								}
								return node?.contentType?.node?.name;
							};
							if (node?.contentType?.node?.name != "products") {
								return;
							}
							obj2.name = node?.title;
							obj2.lat = parseFloat(item3?.coordinates?.lat);
							obj2.lng = parseFloat(item3?.coordinates?.lng);
							obj2.url = `/${keyModule()}/${node?.slug}`;
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
							/**keyModule  */
							const keyModule = () => {
								if (node?.contentType?.node?.name === "softwares") {
									return "software";
								}
								return node?.contentType?.node?.name;
							};
							if (node?.contentType?.node?.name != "softwares") {
								return;
							}
							obj2.name = node?.title;
							obj2.lat = parseFloat(item3?.coordinates?.lat);
							obj2.lng = parseFloat(item3?.coordinates?.lng);
							obj2.url = `/${keyModule()}/${node?.slug}`;
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
						/** keyModule  */
						const keyModule = () => {
							if (node.contentType?.node?.name === "softwares") {
								return "software";
							}
							return node.contentType?.node?.name;
						};
						obj2.name = node?.title;
						obj2.lat = parseFloat(item3?.coordinates?.lat);
						obj2.lng = parseFloat(item3?.coordinates?.lng);
						obj2.url = `/${keyModule()}/${node?.slug}`;
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

export const allCategories = [
	{ title: "Articles", alternate: "Commentary" },
	{ title: "Case studies", alternate: "Case studies" },
	{ title: "Market reports", alternate: "Market reports" },
	{ title: "Public", alternate: "Public" },
	{ title: "Subscriber", alternate: "Subscriber" },
	// { title: "Energy Talks", alternate: "Energy Talks" },
	{ title: "Media", alternate: "Media" },
];

/** findFunc  */
export function isCategory(categoryList, dynamicWords) {
	const words = dynamicWords
		?.flatMap((item) => item.name.toLowerCase().split(/\s|&|\/|,/)) // split by space, &, /, comma
		.map((word) => word?.trim())
		.filter(Boolean); // remove empty strings

	let txt = "";

	categoryList?.forEach((item) => {
		const target = (item.alternate || item.title).toLowerCase();
		const match = words?.some((word) => target.includes(word));

		if (match) {
			if (!txt) {
				txt += item.title;
			} else {
				txt += `, ${item.title}`;
			}
		}
	});

	return txt;
}

/** filterItems for resources */
export const filterItems = (items, filterObj) => {
	return items.filter((item) => {
		const categoryNames =
			item.categories?.nodes?.map((c) => c.name.toLowerCase()) || [];
		const categorySlugs =
			item.categories?.nodes?.map((c) => c.slug.toLowerCase()) || [];

		const allCategoryValues = [...categoryNames, ...categorySlugs];

		const matchKeys = ["category", "country", "software", "product", "service"];
		const matchesCategoryFilters = matchKeys.every((key) => {
			if (!filterObj[key]) return true; // skip if not filtering by this key
			return allCategoryValues.includes(filterObj[key].toLowerCase());
		});

		const filterYear = filterObj.year;
		const itemYear = new Date(item.date).getFullYear();
		const matchesYear = filterYear ? itemYear === filterYear : true;

		const filterLanguage = filterObj.language;
		const itemLanguage = item.language?.native_name?.toLowerCase();
		const matchesLanguage = filterLanguage
			? itemLanguage === filterLanguage.toLowerCase()
			: true;

		return matchesCategoryFilters && matchesYear && matchesLanguage;
	});
};

/** filterBySearchQuery */
export const filterBySearchQuery = (items, searchQuery) => {
	if (!searchQuery) return items;

	const lowerSearch = searchQuery.toLowerCase();

	return items.filter((item) => {
		const tagNames = item.tags?.nodes?.map((tag) => tag.name.toLowerCase()) || [];
		return tagNames.some((tag) => tag.includes(lowerSearch));
	});
};

/** OpenIframePopup  */
export const OpenIframePopup = (modalClassName, iframeLink) => {
	openModal(modalClassName);
	const iframeHtml = document.querySelector(`#${modalClassName} iframe`);
	iframeHtml.src = iframeLink;
};

const defaultBtnProps = {
	postFields: {
		topSectionButton: {
			iframe: "https://go.auroraer.com/l/885013/2025-04-22/pbkzc",
			buttonText: "Subscribe",
			file: null,
		},
	},
};

/** dynamicInsightsBtnProps  */
export const dynamicInsightsBtnProps = (
	data = defaultBtnProps,
	keyVal = "topSectionButton"
) => {
	let obj = {};

	if (data?.postFields?.[keyVal]?.file?.node?.sourceUrl) {
		obj.href = data?.postFields?.[keyVal]?.file?.node?.sourceUrl;
		obj.target = "_blank";
		obj.rel = "noreferrer";
	} else if (data?.postFields?.[keyVal]?.iframe) {
		obj.onClick = () =>
			OpenIframePopup(
				"iframePopup",
				data?.postFields?.[keyVal]?.iframe ||
					"https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
			);
	}
	if (data?.postFields?.[keyVal]?.buttonText) {
		obj.btntext = data?.postFields?.[keyVal]?.buttonText;
	}

	return obj;
};

/** filterEvents  */
export const filterEvents = (items, filterObj) => {
	return items.filter((item) => {
		const categoryNames =
			item.categories?.nodes?.map((c) => c.name.toLowerCase()) || [];
		const categorySlugs =
			item.categories?.nodes?.map((c) => c.slug.toLowerCase()) || [];

		const allCategoryValues = [...categoryNames, ...categorySlugs];

		const matchKeys = ["category", "country", "software", "product", "service"];
		const matchesCategoryFilters = matchKeys.every((key) => {
			if (!filterObj[key]) return true; // skip if not filtering by this key
			return allCategoryValues.includes(filterObj[key].toLowerCase());
		});

		const filterYear = filterObj.year;
		const itemYear = new Date(item.date).getFullYear();

		const matchesYear = filterYear ? itemYear === filterYear : true;

		return matchesCategoryFilters && matchesYear;
	});
};

/** filterBySearchQuery */
export const filterBySearchQueryEvents = (items, searchQuery) => {
	if (!searchQuery) return items;

	const lowerSearch = searchQuery.toLowerCase();

	return items.filter((item) => {
		const tagNames = item.title.toLowerCase();
		return tagNames.includes(lowerSearch);
	});
};

/** filterItemsBySelectedObj  */
export function filterItemsBySelectedObj(arr, selectedObj) {
	const filters = [
		{
			key: "type",
			getNodes: (item) => item.eventscategories?.nodes,
			match: (node, value) => node.name === value,
		},
		{
			key: "country",
			getNodes: (item) => item.events?.thumbnail?.country?.nodes,
			match: (node, value) => node.title === value,
		},
		{
			key: "year",
			match: (item, value) =>
				new Date(item.events?.thumbnail?.date).getFullYear() === value,
		},
		{
			key: "product",
			getNodes: (item) => item.events?.thumbnail?.category?.nodes,
			match: (node, value) => node.title === value,
		},
		{
			key: "software",
			getNodes: (item) => item.events?.thumbnail?.category?.nodes,
			match: (node, value) => node.title === value,
		},
		{
			key: "service",
			getNodes: (item) => item.events?.thumbnail?.category?.nodes,
			match: (node, value) => node.title === value,
		},
		{
			key: "status",
			match: (item, value) => item.events?.thumbnail?.status === value,
		},
	];

	return filters.reduce((filteredArr, { key, getNodes, match }) => {
		const value = selectedObj[key];
		if (!value) return filteredArr;

		return filteredArr.filter((item) => {
			if (getNodes) {
				const nodes = getNodes(item) || [];
				return nodes.some((node) => match(node, value));
			}
			return match(item, value);
		});
	}, arr);
}

/** filterItemsBySelectedObj  */
export function filterItemsBySelectedObjForPress(arr, selectedObj) {
	const filters = [
		{
			key: "year",
			match: (item, value) =>
				new Date(item?.presses?.banner?.date).getFullYear() === value,
		},
		{
			key: "product",
			getNodes: (item) => item.presses?.thumbnail?.category?.nodes,
			match: (node, value) => node.title === value,
		},
		{
			key: "software",
			getNodes: (item) => item.presses?.thumbnail?.category?.nodes,
			match: (node, value) => node.title === value,
		},
		{
			key: "service",
			getNodes: (item) => item.presses?.thumbnail?.category?.nodes,
			match: (node, value) => node.title === value,
		},
		{
			key: "search",
			getNodes: (item) => item.presses?.tags,
			match: (node, value) => node.text === value,
		},
		{
			key: "language",
			match: (item, value) => item.language?.native_name === value,
		},
	];

	return filters.reduce((filteredArr, { key, getNodes, match }) => {
		const value = selectedObj[key];
		if (!value) return filteredArr;

		return filteredArr.filter((item) => {
			if (getNodes) {
				const nodes = getNodes(item) || [];
				return nodes?.some((node) => match(node, value));
			}
			return match(item, value);
		});
	}, arr);
}

/** filterItemsBySelectedObj  */
export function filterItemsBySelectedObjForCareers(arr, selectedObj) {
	const filters = [
		{
			key: "program",
			getNodes: (item) => item.programs?.nodes,
			match: (node, value) => node.name === value,
		},
		{
			key: "country",
			getNodes: (item) => [item.earlyCareers.thumbnail.country.node],
			match: (node, value) => node.title === value,
		},
	];

	return filters.reduce((filteredArr, { key, getNodes, match }) => {
		const value = selectedObj[key];
		if (!value) return filteredArr;

		return filteredArr.filter((item) => {
			if (getNodes) {
				const nodes = getNodes(item) || [];
				return nodes?.some((node) => match(node, value));
			}
			return match(item, value);
		});
	}, arr);
}

/** slugify  */
export function slugify(str) {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric characters
		.replace(/\s+/g, "-") // replace spaces with hyphens
		.replace(/-+/g, "-"); // remove multiple hyphens
}

/** highlightMatches  */
export function highlightMatches(node, term) {
	if (!term || !node || node.nodeType !== 1) return;

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const TEXT_NODE = 3;

	for (let child of Array.from(node.childNodes)) {
		if (child.nodeType === TEXT_NODE) {
			const val = child.nodeValue;
			const idx = val.toLowerCase().indexOf(term);

			if (idx !== -1) {
				const span = document.createElement("span");
				span.className = "highlight";
				span.textContent = val.slice(idx, idx + term.length);

				const after = document.createTextNode(val.slice(idx + term.length));
				const before = document.createTextNode(val.slice(0, idx));

				const parent = child.parentNode;
				parent.replaceChild(after, child);
				parent.insertBefore(span, after);
				parent.insertBefore(before, span);
			}
		} else if (child.nodeType === 1) {
			highlightMatches(child, term);
		}
	}
}

/** scrollToSection */
// export const scrollToSection = (id) => {
// 	scroller.scrollTo(id, {
// 		duration: 500,
// 		smooth: true,
// 		offset: -100,
// 		spy: true,
// 		onEnd: () => console.log("Scrolling finished!"), // ❌ Not available directly
// 	});

// 	setTimeout(() => {
// 		console.log("Scrolling finished!");
// 	}, 500);
// };
