// Switched from Graphql.service (Redis hop, POST, uncacheable) to
// GraphqlDirect (origin, GET, cached and tagged). Reverting is this one line
// — the old module is untouched and still exported.
import GraphQLAPI from "./GraphqlDirect.service";

/** About Page */
export const getFaqPage = async () => {
	const query = `
query FaqPage {
  page(id: "faq", idType: URI) {
    faq {
      banner {
        desc
        title
      }
      categories {
        title
        faq {
          desc
          title
        }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, { apiID: "page", pageID: "/careers/faq" });
	return res;
};
