// FAQ page content over REST. Same `{ data: { page: { faq: … } } }` shape the
// GraphQL query returned, so /careers/faq needs no changes. One request, as
// before — the page's ACF holds nested repeaters but no relations.

import { loadPage, orNull, toRows } from "./GraphqlShape";

const PAGE_ID = "/careers/faq";

/** About Page */
export const getFaqPage = async () => {
	const row = await loadPage("faq", { pageID: PAGE_ID });
	const acf = row?.acf || {};
	const banner = orNull(acf.banner);
	const categories = toRows(acf.categories);

	return {
		data: {
			page: row
				? {
						faq: {
							banner: banner
								? { desc: orNull(banner.desc), title: orNull(banner.title) }
								: null,
							categories:
								categories?.map((category) => ({
									title: orNull(category.title),
									faq:
										toRows(category.faq)?.map((entry) => ({
											desc: orNull(entry.desc),
											title: orNull(entry.title),
										})) ?? null,
								})) ?? null,
						},
					}
				: null,
		},
	};
};
