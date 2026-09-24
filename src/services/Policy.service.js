// Switched from Graphql.service (Redis hop, POST, uncacheable) to
// GraphqlDirect (origin, GET, cached and tagged). Reverting is this one line
// — the old module is untouched and still exported.
import GraphQLAPI from "./GraphqlDirect.service";

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
		pageID: "/policies-and-compliance",
	});
	return res;
};
