/* eslint-disable quotes */
import GraphQLAPI, { seoTags } from "./Graphql.service";

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
		tags: seoTags(page),
		apiID: "common",
		pageID: "/common",
		// taxonomies
	});
	return res;
};
