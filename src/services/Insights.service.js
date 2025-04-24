import GraphQLAPI from "./Graphql.service";

/** Insights Page */
export const getInsights = async () => {
	const query = `
query GetInsights {
  posts(first: 9999) {
    nodes {
      content
      title
      slug
      categories(first: 9999) {
        nodes {
          slug
          name
        }
      }
      language {
        id
        code
        language_code
        native_name
      }
      tags(first: 9999) {
        nodes {
          name
          slug
        }
      }
    }
  }
  tags(first: 9999) {
    nodes {
      name
      slug
    }
  }
  categories(first: 9999) {
    nodes {
      name
      slug
    }
  }
  countries(first: 9999) {
    nodes {
      title
      slug
    }
  }
  products(first: 9999) {
    nodes {
      title
      slug
    }
  }
  softwares(first: 9999) {
    nodes {
      slug
      title
    }
  }
  services(first: 9999) {
    nodes {
      slug
      title
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
