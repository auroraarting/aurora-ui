import GraphQLAPI from "./Graphql.service";

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
