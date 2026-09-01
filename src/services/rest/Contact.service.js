// Contact page banner over REST. Same `{ data: { page: { contact: … } } }` shape
// the GraphQL query returned. One request.

import { loadPage, orNull, wpautop } from "./GraphqlShape";

const PAGE_ID = "/company/contact";

/** Fetch Page */
export const getContact = async () => {
	const row = await loadPage("contact", { pageID: PAGE_ID });
	const banner = orNull(row?.acf?.banner);

	return {
		data: {
			page: row
				? {
						contact: {
							banner: banner
								? {
										// A WYSIWYG field — GraphQL served it paragraphed.
										description: wpautop(banner.description),
										title: orNull(banner.title),
									}
								: null,
						},
					}
				: null,
		},
	};
};
