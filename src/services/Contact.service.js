// Switched from Graphql.service (Redis hop, POST, uncacheable) to
// GraphqlDirect (origin, GET, cached and tagged). Reverting is this one line
// — the old module is untouched and still exported.
import GraphQLAPI from "./GraphqlDirect.service";

/** Team Sectors Section */
export const getContact = async () => {
	const query = `
query GetContact {
  page(id: "contact", idType: URI) {
    contact {
      banner {
        description
        title
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "page",
		pageID: "/company/contact",
	});
	return res;
};
