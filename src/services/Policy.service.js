import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getPolicy = async (slug) => {
	const query = `
query GetPolicy {
  page(id: "policies-and-compliance", idType: URI) {
    slug
    title
    content
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "page",
		tag: "page:policies-and-compliance",
		pageID: "/policies-and-compliance",
	});
	return res;
};
