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
	const res = await GraphQLAPI(query);
	return res;
};
