/* eslint-disable quotes */
import GraphQLAPI from "./Graphql.service";

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
		pageID: "/common",
		// taxonomies
	});
	return res;
};
