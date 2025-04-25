import GraphQLAPI from "./Graphql.service";

/** Insights Page */
export const getInsights = async (filterString) => {
	const query = `
query GetInsights {
  posts(first:9999) {
  pageInfo {
               endCursor
      hasNextPage
      hasPreviousPage
      startCursor
        }
    nodes {
      title
      slug
      date
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
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
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Insights Page */
export const getInsightsPath = async () => {
	const query = `
query GetInsights {
  posts(first:9999) {
    nodes {
      title
      slug
      date
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** getInsights Categories  */
export const getInsightsCategories = async () => {
	const query = `
query GetInsightsDropDowns {
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

/** Insights Page */
export const getInsightsInside = async (slug) => {
	const query = `
query GetInsightsInside {
  postBy(slug: "${slug}"){
     title
      slug
      date
      content
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
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
    `;
	const res = await GraphQLAPI(query);
	return res;
};
