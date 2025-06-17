/* eslint-disable quotes */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
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

				/** keyModule  */
				const keyModule = () => {
					if (
						markerItem?.category?.nodes?.[0]?.contentType?.node?.name === "softwares"
					) {
						return "software";
					}
					if (
						markerItem?.category?.nodes?.[0]?.contentType?.node?.name === "services"
					) {
						return "service";
					}
					return markerItem?.category?.nodes?.[0]?.contentType?.node?.name;
				};

				let obj = {
					unique: Math.random(),
					name: markerItem?.category?.nodes?.[0]?.title || "",
					lat: parseFloat(markerItem?.coordinates?.lat),
					lng: parseFloat(markerItem?.coordinates?.lng),
					url: `/${keyModule()}/${markerItem?.category?.nodes?.[0]?.slug}`,
					icon:
						node?.services?.map?.logo?.node?.mediaItemUrl ||
						node?.products?.map?.logo?.node?.mediaItemUrl ||
						node?.softwares?.map?.logo?.node?.mediaItemUrl ||
						markerItem?.icon?.node?.mediaItemUrl ||
						"",
				};

				if (markerItem?.mapThumbnail) {
					obj.hoverImg = markerItem.mapThumbnail.node.mediaItemUrl;
				}
				if (markerItem?.icon?.node?.mediaItemUrl) {
					obj.icon = markerItem.icon.node.mediaItemUrl;
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
							// icon: item3?.icon?.node?.mediaItemUrl,
							icon:
								node?.services?.map?.logo?.node?.mediaItemUrl ||
								node?.products?.map?.logo?.node?.mediaItemUrl ||
								node?.softwares?.map?.logo?.node?.mediaItemUrl ||
								item3?.icon?.node?.mediaItemUrl ||
								"",
							unique: Math.random(),
						};

						if (item3?.mapThumbnail?.node?.mediaItemUrl) {
							obj2.hoverImg = item3.mapThumbnail.node.mediaItemUrl;
						}

						if (item3?.category?.nodes?.length > 0) {
							/** keyModule  */
							const keyModule = () => {
								if (node?.contentType?.node?.name === "softwares") {
									return "software";
								}
								if (node?.contentType?.node?.name === "services") {
									return "service";
								}
								return node?.contentType?.node?.name;
							};
							if (node?.contentType?.node?.name != "products") {
								return;
							}
							obj2.name = node?.title;
							obj2.lat = parseFloat(item3?.coordinates?.lat);
							obj2.lng = parseFloat(item3?.coordinates?.lng);
							// obj2.url = `/${keyModule()}/${node?.slug}`;
							obj2.url = `/global-presence/${item2?.slug}`;
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

/** getMapJsonForService  */
export function getMapJsonForService(regions) {
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
							// icon: item3?.icon?.node?.mediaItemUrl,
							icon:
								node?.services?.map?.logo?.node?.mediaItemUrl ||
								node?.products?.map?.logo?.node?.mediaItemUrl ||
								node?.softwares?.map?.logo?.node?.mediaItemUrl ||
								item3?.icon?.node?.mediaItemUrl ||
								"",
							unique: Math.random(),
						};

						if (item3?.mapThumbnail?.node?.mediaItemUrl) {
							obj2.hoverImg = item3.mapThumbnail.node.mediaItemUrl;
						}

						if (item3?.category?.nodes?.length > 0) {
							/** keyModule  */
							const keyModule = () => {
								if (node?.contentType?.node?.name === "softwares") {
									return "software";
								}
								if (node?.contentType?.node?.name === "services") {
									return "service";
								}
								return node?.contentType?.node?.name;
							};
							if (node?.contentType?.node?.name != "services") {
								return;
							}
							obj2.name = node?.title;
							obj2.lat = parseFloat(item3?.coordinates?.lat);
							obj2.lng = parseFloat(item3?.coordinates?.lng);
							// obj2.url = `/${keyModule()}/${node?.slug}`;
							obj2.url = `/global-presence/${item2?.slug}`;
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
							// icon: item3?.icon?.node?.mediaItemUrl,
							icon:
								node?.services?.map?.logo?.node?.mediaItemUrl ||
								node?.products?.map?.logo?.node?.mediaItemUrl ||
								node?.softwares?.map?.logo?.node?.mediaItemUrl ||
								item3?.icon?.node?.mediaItemUrl ||
								"",
							unique: Math.random(),
						};

						if (item3?.mapThumbnail?.node?.mediaItemUrl) {
							obj2.hoverImg = item3.mapThumbnail.node.mediaItemUrl;
						}

						if (item3?.category?.nodes?.length > 0) {
							/**keyModule  */
							const keyModule = () => {
								if (node?.contentType?.node?.name === "softwares") {
									return "software";
								}
								if (node?.contentType?.node?.name === "services") {
									return "service";
								}
								return node?.contentType?.node?.name;
							};
							if (node?.contentType?.node?.name != "softwares") {
								return;
							}
							obj2.name = node?.title;
							obj2.lat = parseFloat(item3?.coordinates?.lat);
							obj2.lng = parseFloat(item3?.coordinates?.lng);
							// obj2.url = `/${keyModule()}/${node?.slug}`;
							obj2.url = `/global-presence/${item2?.slug}`;
						}

						return obj2;
					})
					.filter((item) => item),
				zoom: item2?.countries?.map?.zoom,
				name: item2?.title,
				slug: item2?.slug,
			};

			obj && mapJson.push(obj);
		});
	});
	return mapJson;
}

/** filterMarkersBySlug  */
export function filterMarkersBySlug(data, slug) {
	data.data.regions?.nodes.forEach((region) => {
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
							node?.services?.map?.logo?.node?.mediaItemUrl ||
							node?.products?.map?.logo?.node?.mediaItemUrl ||
							node?.softwares?.map?.logo?.node?.mediaItemUrl ||
							item3?.icon?.node?.mediaItemUrl,
						unique: Math.random(),
					};

					if (item3?.mapThumbnail?.node?.mediaItemUrl) {
						obj2.hoverImg = item3.mapThumbnail.node.mediaItemUrl;
					}

					if (item3?.category?.nodes?.length > 0) {
						/** keyModule  */
						const keyModule = () => {
							if (node.contentType?.node?.name === "softwares") {
								return "software";
							}
							if (node?.contentType?.node?.name === "services") {
								return "service";
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
	{ title: "Case Studies", alternate: "Case Studies" },
	{ title: "Market Reports", alternate: "Market Reports" },
	// { title: "Public", alternate: "Public" },
	{ title: "Subscriber", alternate: "Subscriber" },
	// { title: "Energy Talks", alternate: "Energy Talks" },
	{ title: "Media", alternate: "Media" },
];

/** findFunc  */
export function isCategory(categoryList, dynamicWords, forUrl = false) {
	const names = dynamicWords
		?.map((item) => item.name.toLowerCase().trim())
		.filter(Boolean);

	let matchedTitles = [];

	categoryList?.map((item) => {
		const target = (item.alternate || item.title).toLowerCase().trim();

		if (names?.includes(target)) {
			if (!forUrl) {
				if (item.title === "Case Studies") {
					item.title = "Case Study";
				}
				if (item.title === "Market Reports") {
					item.title = "Market Report";
				}
				if (item.title === "Articles") {
					item.title = "Article";
				}
			} else {
				if (item.title === "Case Study") {
					item.title = "Case Studies";
				}
				if (item.title === "Market Report") {
					item.title = "Market Reports";
				}
				if (item.title === "Article") {
					item.title = "Articles";
				}
			}

			matchedTitles.push(item.title);
		}
	});

	return matchedTitles.join(", ");
}

/** filterItems for resources */
export const filterItems = (items, filterObj) => {
	return items.filter((item) => {
		const categoryNodes = item.categories?.nodes || [];
		const categoryNames = categoryNodes.map((c) => c.name.toLowerCase());
		const categorySlugs = categoryNodes.map((c) => c.slug.toLowerCase());
		const allCategoryValues = [...categoryNames, ...categorySlugs];

		// 1. Match specific filters
		const matchKeys = ["category", "country", "software", "product", "service"];
		const matchesCategoryFilters = matchKeys.every((key) => {
			if (!filterObj[key]) return true;
			return allCategoryValues.includes(filterObj[key].toLowerCase());
		});

		// 2. Match Year
		const filterYear = filterObj.year;
		const itemYear = new Date(item.date).getFullYear();
		const matchesYear = filterYear ? itemYear === filterYear : true;

		// 3. Match Language
		const filterLanguage = filterObj.language;
		const itemLanguage = item.language?.native_name?.toLowerCase();
		const matchesLanguage = filterLanguage
			? itemLanguage === filterLanguage.toLowerCase()
			: true;

		// 3. Status
		const filterStatus = filterObj.status;
		const todaysDate = new Date();
		const itemDate = new Date(item?.date);
		/** matchesStatus  */
		const matchesStatusFunc = () => {
			if (filterStatus) {
				if (filterStatus === "Upcoming") {
					return itemDate >= todaysDate; // Upcoming events
				} else {
					return itemDate < todaysDate; // Past events
				}
			} else {
				return true;
			}
		};
		const matchesStatus = matchesStatusFunc();

		//     {
		// 	key: "status",
		// 	match: (item, value) => {
		// 		let todaysDate = new Date();
		// 		if (value === "Upcoming")
		// 			return new Date(item.events?.thumbnail?.date) >= todaysDate;
		// 		return new Date(item.events?.thumbnail?.date) < todaysDate;
		// 	},
		// },

		// 4. 🔍 Enhanced Search
		const matchSearch = filterObj.search
			? (() => {
					const lowerSearch = filterObj.search.toLowerCase() || [];
					const sectionTitles =
						item?.postFields?.sections?.map((p) => p?.sectionTitle) || [];
					const sectionContent =
						item?.postFields?.sections?.map((p) => p?.content) || [];
					const mediaContactTitles =
						item?.postFields?.mediaContact?.map((p) => p?.name) || [];
					const mediaContactDesc =
						item?.postFields?.mediaContact?.map((p) => p?.designation) || [];
					const testimonialsTitles =
						item?.postFields?.testimonials?.nodes?.map((p) => p?.title) || [];
					const testimonialsContent =
						item?.postFields?.testimonials?.nodes?.map((p) => p?.content) || [];
					const testimonialsDesignation =
						item?.postFields?.testimonials?.nodes?.map(
							(p) => p?.testimonials?.designation
						) || [];
					const authorsTitle =
						item?.postFields?.authors?.nodes?.map((p) => p?.title) || [];
					const authorsContent =
						item?.postFields?.authors?.nodes?.map((p) => p?.content) || [];
					const authorsDesignation =
						item?.postFields?.authors?.nodes?.map(
							(p) => p?.postAuthors?.thumbnail?.designation
						) || [];

					const searchText = [
						item.title,
						item.content,
						item?.postFields?.about?.content,
						item?.postFields?.mediaContact,
						item.language?.native_name,
						itemYear.toString(),
						...authorsTitle,
						...authorsContent,
						...testimonialsTitles,
						...testimonialsContent,
						...authorsDesignation,
						...mediaContactTitles,
						...testimonialsDesignation,
						...mediaContactDesc,
						...categoryNames,
						...categorySlugs,
						sectionTitles,
						sectionContent,
					]
						.filter(Boolean)
						.join(" ")
						.toLowerCase();

					return searchText.includes(lowerSearch);
			  })()
			: true;

		return (
			matchesCategoryFilters &&
			matchesYear &&
			matchesLanguage &&
			matchSearch &&
			matchesStatus
		);
	});
};

/** filterItems for resources */
export const filterItemsForPodcast = (podcasts, selected) => {
	return podcasts.filter((podcast) => {
		const { podcastFields, date, content } = podcast;

		// Country
		const countries = podcastFields.country?.nodes || [];
		const matchCountry = selected.country
			? countries.some((c) => c.title === selected.country)
			: true;

		// poweredBy
		const poweredBy = podcastFields.poweredBy?.nodes || [];

		const matchSoftware = selected.software
			? poweredBy.some(
					(p) =>
						p.contentType.node.name === "softwares" && p.title === selected.software
			  )
			: true;

		const matchProduct = selected.product
			? poweredBy.some(
					(p) =>
						p.contentType.node.name === "products" && p.title === selected.product
			  )
			: true;

		const matchService = selected.service
			? poweredBy.some(
					(p) =>
						p.contentType.node.name === "services" && p.title === selected.service
			  )
			: true;

		// Year
		const matchYear = selected.year
			? new Date(date).getFullYear() === selected.year
			: true;

		// 3. Status
		const filterStatus = selected.status;
		const todaysDate = new Date();
		const itemDate = new Date(podcast?.podcastFields?.date);
		/** matchesStatus  */
		const matchesStatusFunc = () => {
			if (filterStatus) {
				if (filterStatus === "Upcoming") {
					return itemDate >= todaysDate; // Upcoming events
				} else {
					return itemDate < todaysDate; // Past events
				}
			} else {
				return true;
			}
		};
		const matchesStatus = matchesStatusFunc();

		// 🔍 Enhanced Search
		const matchSearch = selected.search
			? (() => {
					const lowerSearch = selected.search.toLowerCase();

					const title = podcast.title || "";
					const countryTitles = countries.map((c) => c.title);
					const softwareTitles = poweredBy
						.filter((p) => p.contentType.node.name === "softwares")
						.map((p) => p.title);
					const productTitles = poweredBy
						.filter((p) => p.contentType.node.name === "products")
						.map((p) => p.title);
					const serviceTitles = poweredBy
						.filter((p) => p.contentType.node.name === "services")
						.map((p) => p.title);
					const sectionTitles = podcastFields?.sections?.map((p) => p?.sectionTitle);
					const sectionContent = podcastFields?.sections?.map((p) => p?.content);
					const year = date ? new Date(date).getFullYear().toString() : "";

					const searchableText = [
						title,
						content,
						sectionTitles,
						sectionContent,
						...countryTitles,
						...softwareTitles,
						...productTitles,
						...serviceTitles,
						year,
					]
						.join(" ")
						.toLowerCase();

					return searchableText.includes(lowerSearch);
			  })()
			: true;

		return (
			matchCountry &&
			matchSoftware &&
			matchProduct &&
			matchService &&
			matchYear &&
			matchSearch &&
			matchesStatus
		);
	});
};

/** filterItems for resources */
export const filterItemsForWebinar = (podcasts, selected) => {
	return podcasts.filter((podcast) => {
		const { webinarsFields, eventCategories, title, content, webinarTags } =
			podcast;
		const date = webinarsFields?.startDateAndTime;

		// 1. Match country
		const countries = webinarsFields?.country?.nodes || [];
		const matchCountry = selected.country
			? countries.some((c) => c.title === selected.country)
			: true;

		// 2. Match poweredBy types
		const poweredBy = webinarsFields.serviceBy?.nodes || [];

		const matchSoftware = selected.software
			? poweredBy.some(
					(p) =>
						p.contentType.node.name === "softwares" && p.title === selected.software
			  )
			: true;

		const matchProduct = selected.product
			? poweredBy.some(
					(p) =>
						p.contentType.node.name === "products" && p.title === selected.product
			  )
			: true;

		const matchService = selected.service
			? poweredBy.some(
					(p) =>
						p.contentType.node.name === "services" && p.title === selected.service
			  )
			: true;

		// 3. Match year
		const matchYear = selected.year
			? new Date(date).getFullYear() === selected.year
			: true;

		// 4. Match Category
		const categories = eventCategories?.nodes || [];
		const matchCategory = selected.category
			? categories.some((c) => c.name === selected.category)
			: true;

		// 3. Status
		const filterStatus = selected.status;
		const todaysDate = new Date();
		const itemDate = new Date(podcast?.webinarsFields?.endDateAndTime);
		/** matchesStatus  */
		const matchesStatusFunc = () => {
			if (filterStatus) {
				if (filterStatus === "Upcoming") {
					return itemDate >= todaysDate; // Upcoming events
				} else {
					return itemDate < todaysDate; // Past events
				}
			} else {
				return true;
			}
		};
		const matchesStatus = matchesStatusFunc();

		// 5. 🔍 Enhanced Search
		const matchSearch = selected.search
			? (() => {
					const lowerSearch = selected.search.toLowerCase();
					const countryTitles = countries.map((c) => c.title);
					const categoryNames = categories.map((c) => c.name);
					const softwareTitles = poweredBy
						.filter((p) => p.contentType.node.name === "softwares")
						.map((p) => p.title);
					const productTitles = poweredBy
						.filter((p) => p.contentType.node.name === "products")
						.map((p) => p.title);
					const serviceTitles = poweredBy
						.filter((p) => p.contentType.node.name === "services")
						.map((p) => p.title);
					const webinarTagsTitles = webinarTags.nodes.map((p) => p.name);
					const year = date ? new Date(date).getFullYear().toString() : "";
					const sectionTitles = webinarsFields?.sections?.map(
						(p) => p?.sectionTitle
					);
					const sectionContent = webinarsFields?.sections?.map((p) => p?.content);

					const searchableText = [
						content,
						title,
						sectionTitles,
						sectionContent,
						...countryTitles,
						...categoryNames,
						...softwareTitles,
						...productTitles,
						...serviceTitles,
						...webinarTagsTitles,
						year,
					]
						.join(" ")
						.toLowerCase();

					return searchableText.includes(lowerSearch);
			  })()
			: true;

		return (
			matchCountry &&
			matchSoftware &&
			matchProduct &&
			matchService &&
			matchYear &&
			matchCategory &&
			matchSearch &&
			matchesStatus
		);
	});
};

/** filterBySearchQuery */
export const filterBySearchQuery = (items, searchQuery) => {
	console.log(searchQuery, "searchQuery");
	if (!searchQuery) return items;

	const lowerSearch = searchQuery.toLowerCase();

	return items.filter((item) => {
		const tagNames = item.tags?.nodes?.map((tag) => tag.name.toLowerCase()) || [];
		return tagNames.some((tag) => tag.includes(lowerSearch));
	});
};

/** filterBySearchQuery */
export const filterBySearchQueryWebinar = (items, searchQuery) => {
	if (!searchQuery) return items;

	const lowerSearch = searchQuery.toLowerCase();

	return items.filter((item) => {
		const tagNames =
			item.webinarTags?.nodes?.map((tag) => tag.name.toLowerCase()) || [];
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

	const fileUrl = data?.postFields?.[keyVal]?.file?.node?.mediaItemUrl;
	const fallbackUrl = data?.postFields?.[keyVal]?.url;
	const finalUrl = fileUrl || fallbackUrl;

	if (finalUrl) {
		// Show this below
		obj.href = finalUrl;

		// If fileUrl exists, treat it as external (always open in new tab)
		if (fileUrl) {
			// obj.style = { display: "none" };
			obj.target = "_blank";
			obj.rel = "noreferrer";
			obj.onClick = () => {
				// Show this below
				window.open(fileUrl, "_blank", "noopener,noreferrer");
			};
		}
		// If we're using fallbackUrl, check if it's external
		else if (fallbackUrl) {
			const isExternal =
				typeof window !== "undefined" &&
				!fallbackUrl.startsWith("/") &&
				!fallbackUrl.includes(window.location.origin);
			const isMailTo = fallbackUrl.startsWith("mailto:");

			if (isExternal) {
				if (!isMailTo) {
					obj.target = "_blank";
					obj.rel = "noreferrer";
					obj.onClick = () => {
						// Show this below
						window.open(fallbackUrl, "_blank", "noopener,noreferrer");
					};
				}
			} else {
				// Internal URL — same tab
				obj.onClick = () => {
					// Show this below
					window.location.href = fallbackUrl;
				};
			}
		}
	} else if (data?.postFields?.[keyVal]?.iframe) {
		obj.onClick = () => {
			OpenIframePopup(
				"iframePopup",
				data?.postFields?.[keyVal]?.iframe ||
					"https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
			);
		};
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
			match: (item, value) => {
				let todaysDate = new Date();
				if (value === "Upcoming")
					return new Date(item.events?.thumbnail?.date) >= todaysDate;
				return new Date(item.events?.thumbnail?.date) < todaysDate;
			},
		},
		// 🔍 Add search filter
		{
			key: "search",
			match: (item, value) => {
				const lowerValue = value.toLowerCase();

				// Get title
				const title = item.title || item.events?.title || "";

				// Get title
				const content = item.content || "";

				// Get country names
				const countries =
					item.events?.thumbnail?.country?.nodes?.map((c) => c.title) || [];

				// Get types
				const types = item.eventscategories?.nodes?.map((n) => n.name) || [];

				// Get product/service/software titles
				const categories =
					item.events?.thumbnail?.category?.nodes?.map((n) => n.title) || [];

				// Get status
				let todaysDate = new Date();
				const status =
					new Date(item.events?.thumbnail?.date) >= todaysDate ? "Upcoming" : "Past";

				// Get year
				const date = item.events?.thumbnail?.date;
				const year = date ? new Date(date).getFullYear().toString() : "";

				const speakersTitle =
					item.events?.speakers?.speakers?.flatMap((item) =>
						item?.speakers?.nodes?.map((item2) => item2?.title)
					) || [];
				const speakersContent =
					item.events?.speakers?.speakers?.flatMap((item) =>
						item?.speakers?.nodes?.map((item2) => item2?.content)
					) || [];
				const speakersDesignation =
					item.events?.speakers?.speakers?.flatMap((item) =>
						item?.speakers?.nodes?.map(
							(item2) => item2?.postSpeakers?.thumbnail?.designation
						)
					) || [];

				// Combine all fields into a single string for search
				const searchableText = [
					title,
					content,
					item?.events?.interestedDesc,
					item?.events?.pricingDesc,
					item?.events?.location?.address,
					item?.events?.location?.desc,
					...speakersTitle,
					...speakersContent,
					...speakersDesignation,
					...countries,
					...types,
					...categories,
					status,
					year,
				]
					.join(" ")
					.toLowerCase();

				return searchableText.includes(lowerValue);
			},
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
			key: "language",
			match: (item, value) => item.language?.native_name === value,
		},
	];

	// Step 1: Apply filters (year, product, software, service, language)
	let filteredArr = filters.reduce((acc, { key, getNodes, match }) => {
		const value = selectedObj[key];
		if (!value) return acc;

		return acc.filter((item) => {
			if (getNodes) {
				const nodes = getNodes(item) || [];
				return nodes?.some((node) => node && match(node, value));
			}
			return match(item, value);
		});
	}, arr);

	// Step 2: Apply search filter by title (case-insensitive)
	if (selectedObj.search) {
		const searchValue = selectedObj.search.toLowerCase();
		filteredArr = filteredArr.filter((item) =>
			item.title?.toLowerCase().includes(searchValue)
		);
	}

	return filteredArr;
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
			getNodes: (item) => [item.earlyCareers?.thumbnail?.country?.node],
			match: (node, value) => node?.title === value,
		},
	];

	// Step 1: Apply program/country filters
	let filteredArr = filters.reduce((acc, { key, getNodes, match }) => {
		const value = selectedObj[key];
		if (!value) return acc;

		return acc.filter((item) => {
			const nodes = getNodes(item) || [];
			return nodes?.some((node) => node && match(node, value));
		});
	}, arr);

	// Step 2: Apply search filter by title
	if (selectedObj.search) {
		const searchValue = selectedObj.search.toLowerCase();
		filteredArr = filteredArr.filter((item) =>
			item.title?.toLowerCase().includes(searchValue)
		);
	}

	return filteredArr;
}

/** slugify  */
export function slugify(str) {
	return str
		?.toLowerCase()
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
// 	})};

// 	setTimeout(() => {
// 		console.log("Scrolling finished!");
// 	}, 500);
// };

/** Generate link and title based on content key */
export const getLinkAndTitle = (key, item = {}, searchTerm) => {
	const searchQuery = searchTerm
		? `?search=${encodeURIComponent(searchTerm)}`
		: "";

	/** slug  */
	function Slug(pageSlug) {
		switch (pageSlug) {
			case "early-careers-landing":
				return "/careers/early-careers";
			case "faq":
				return "/careers/faq";
			case "join-us":
				return "/careers/join-us";
			case "our-team":
				return "/careers/our-team";
			case "life-at-aurora":
				return "/careers/life-at-aurora";
			case "press-landing":
				return "/company/press-landing";
			case "about":
				return "/company/about";
			case "global-presence":
				return "/company/global-presence";
			case "contact":
				return "/company/contact";
			case "event-landing":
				return "/events";
			case "energy-talks-listing":
				return "/resources/energy-talks";
			case "insight-listing":
				return "/resources/aurora-insights";
			case "webinar-listing":
				return "/resources/webinar";
			case "eos":
				return "/eos";
			case "product":
				return "/products";
			case "software":
				return "/software";
			case "homepage":
				return "/";
			case "bundles":
				return "/careers/life-at-aurora";
			default:
				return "/";
		}
	}

	switch (key) {
		case "about":
			return {
				link: `/company/about${searchQuery}`,
				title: "About",
			};
		case "eos":
			return {
				link: `/eos${searchQuery}`,
				title: "Eos",
			};
		case "globalPresence":
			return {
				link: `/global-presence${searchQuery}`,
				title: "Global Presence",
			};
		case "homepage":
			return {
				link: `/${searchQuery}`,
				title: "Home",
			};
		case "lifeAtAurora":
		case "offices":
			return {
				link: `/careers/life-at-aurora${searchQuery}`,
				title: "Life At Aurora",
			};
		case "softwares":
			return {
				link: `/software/${item.slug}${searchQuery}`,
				title: item.title,
			};
		case "products":
			return {
				link: `/products/${item.slug}${searchQuery}`,
				title: item.title,
			};
		case "services":
			return {
				link: `/service/${item.slug}${searchQuery}`,
				title: item.title,
			};
		case "teams":
		case "teamsectors":
			return {
				link: `/company/team${searchQuery}`,
				title: item.title,
			};
		case "whoareyous":
			return {
				link: `/who-are-you/${item.slug}${searchQuery}`,
				title: item.title,
			};
		case "howWeHelps":
			return {
				link: `/how-we-help/${item.slug}${searchQuery}`,
				title: item.title,
			};
		case "posts":
			return {
				link: `${item.slug}${searchQuery}`,
				title: item.title,
			};
		case "events":
			return {
				link: `/events/${item.slug}${searchQuery}`,
				title: item.title,
			};
		case "pages":
			return {
				link: `${Slug(item?.slug)}${searchQuery}`,
				title: item.title,
			};
		case "podcasts":
			return {
				link: `/resources/energy-talks/${item?.slug}${searchQuery}`,
				title: item.title,
			};
		case "howwehelp":
			return {
				link: `/how-we-help/${item?.slug}${searchQuery}`,
				title: item.title,
			};
		case "whoareyou":
			return {
				link: `/who-are-you/${item?.slug}${searchQuery}`,
				title: item.title,
			};

		default:
			return {
				link: `/${searchQuery}`,
				title: "Home",
			};
	}
};

/** formatTitleForEpisode  */
export function formatTitleForEpisode(title) {
	return title.replace(/(EP\.\d+)/, '<span class="ep-label">$1</span>');
}

/** updateQueryFast  */
export const updateQueryFast = (selecObj) => {
	const params = new URLSearchParams(window.location.search);

	for (const key in selecObj) {
		const value = selecObj[key];

		// Remove from URL if value is empty string, null, or undefined
		if (value === "" || value === undefined || value === null) {
			params.delete(key);
		} else {
			params.set(key, value);
		}
	}

	const newUrl = `${window.location.pathname}?${params.toString()}`;
	window.history.pushState({}, "", newUrl); // Fast and smooth
};

/** removeHTML  */
export function removeHTML(str) {
	return str?.replace(/<[^>]*>/g, "");
}
