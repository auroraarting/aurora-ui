import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getTerms = async (slug) => {
	const query = `
query GetTerms {
  page(id: "terms", idType: URI) {
    slug
    title
    content
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "page",
		pageID: "/legal/terms",
	});
	return res;
};
