// Switched from Graphql.service (Redis hop, POST, uncacheable) to
// GraphqlDirect (origin, GET, cached and tagged). Reverting is this one line
// — the old module is untouched and still exported.
import GraphQLAPI from "./GraphqlDirect.service";

/** Fetch Page */
export const getSafeSender = async () => {
	const query = `
query GetSafeSender {
  page(id: "add-aurora-as-a-safe-sender", idType: URI) {
    slug
    title
    content
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "page",
		pageID: "/add-aurora-as-a-safe-sender",
	});
	return res;
};
