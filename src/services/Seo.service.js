/* eslint-disable quotes */
import GraphQLAPI from "./Graphql.service";
import { tagsForSeoRoot } from "./CacheTags";

/** Home Page */
export const getPageSeo = async (page) => {
	const query = `
query GetSeo {
${page} {
status
    seo {
      title
      metaDesc
      metaKeywords
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "common",
		// `page` is the root field the caller passed in, e.g.
		// `page(id: "about", idType: URI)` — the only record of which entry this
		// metadata belongs to, so the tag is read back out of it.
		tag: tagsForSeoRoot(page),
		pageID: "/common",
	});
	return res;
};
