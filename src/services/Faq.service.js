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
		tags: ["page:faq"],
		apiID: "page",
		pageID: "/careers/faq",
	});
	return res;
};
