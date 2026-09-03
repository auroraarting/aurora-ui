import GraphQLAPI from "./Graphql.service";

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
	const res = await GraphQLAPI(query, {
		apiID: "page",
		tag: "page:faq",
		pageID: "/careers/faq",
	});
	return res;
};
