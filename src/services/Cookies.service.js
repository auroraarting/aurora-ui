import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getCookies = async (slug) => {
	const query = `
query GetCookies {
  page(id: "cookies", idType: URI) {
    slug
    title
    content
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "page",
		pageID: "/legal/cookies",
	});
	return res;
};
