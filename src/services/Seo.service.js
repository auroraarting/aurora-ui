/* eslint-disable quotes */
import GraphQLAPI from "./Graphql.service";

/** Home Page */
export const getPageSeo = async (page) => {
	const query = `
query GetSeo {
${page} {
    seo {
      title
      metaDesc
      metaKeywords
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

// getSinglePageSeo("about");
// getDynamicPageSeo('softwareBy(slug: "origin")');
