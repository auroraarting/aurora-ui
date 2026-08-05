import GraphQLAPI from "./Graphql.service";

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
