import GraphQLAPI, { GraphQLAPINoBottleneck } from "./Graphql.service";

/** Insights Page */
export const getInsights = async (filterString = "first:9999") => {
	const query = `
query GetInsights {
  posts(${filterString}) {
    nodes {
    title
    slug
    date
    content
    translations{
    title
    content
    languageCode
    }
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
    categories(first: 9999) {
      nodes {
        slug
        name
        translations{
    name
    languageCode
    }
      }
    }
    tags(first: 9999) {
      nodes {
        name
        slug
      }
    }
    postFields {
      topSectionButton {
        iframe
        buttonText
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      middleSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      bottomSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      insightsSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }

      time

      authors {
        nodes {
          ... on PostAuthor {
            content
            title
            slug
            postAuthors {
              thumbnail {
                linkedinLink
                designation
                image {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
      speakers {
        nodes {
          ... on PostSpeaker {
            title
            slug
            postSpeakers {
              thumbnail {
                designation
                linkedinLink
                image {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
      client {
        title
        image {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      podcast
      poweredBy {
        nodes {
          ... on Product {
            id
            products {
              thumbnail {
                primaryColor
              }
              map {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
              banner {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
            title
            slug
          }
          contentType {
            node {
              id
              label
              name
              uri
            }
          }
          ... on Service {
            id
            title
            slug
            contentType {
              node {
                name
                uri
                label
              }
            }
            services {
              thumbnail {
                primaryColor
              }
              map {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
              banner {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
          ... on Software {
            id
            title
            slug
            contentType {
              node {
                label
                name
              }
            }
            softwares {
              thumbnail {
                primaryColor
              }
              banner {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
              map {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
      testimonials {
        nodes {
          ... on Testimonial {
            id
            content
            title
            slug
            testimonials {
              designation
            }
          }
        }
      }
      recordingSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      sections {
        content
        sectionTitle
        lottie {
          node {
            altText
            mediaItemUrl
          }
        }
        buttons {
          buttonText
          iframe
          url
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      mediaContact {
        designation
        name
        email {
          text
        }
        phone {
          text
        }
      }
      about {
        content
        sectionTitle
      }
      insights {
        desc
        title
      }
    }
  }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "post",
		pageID: "/resources/aurora-insights",
	});
	return res;
};

/** getInsightsTranslations */
export const getInsightsTranslations = async (filterString = "first:9999") => {
	const query = `
query GetInsights {
  posts(${filterString}) {
    nodes {
      translations {
        title
        date
        content
        language {
                  code
                  country_flag_url
                  default_locale
                  id
                  language_code
                  translated_name
                  native_name
                  url
                }
      }
        slug
         title
        date
        content
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      categories(first: 9999) {
        nodes {
          slug
          name
          translations{
           language {
                  code
                  country_flag_url
                  default_locale
                  id
                  language_code
                  translated_name
                  native_name
                  url
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
      postFields {
        topSectionButton {
          iframe
          buttonText
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        middleSectionButton {
          buttonText
          iframe
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        bottomSectionButton {
          buttonText
          iframe
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        insightsSectionButton {
          buttonText
          iframe
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        time
        authors {
          nodes {
            ... on PostAuthor {
              content
              title
              slug
              postAuthors {
                thumbnail {
                  linkedinLink
                  designation
                  image {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
        }
        speakers {
          nodes {
            ... on PostSpeaker {
              title
              slug
              postSpeakers {
                thumbnail {
                  designation
                  linkedinLink
                  image {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
        }
        client {
          title
          image {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        podcast
        poweredBy {
          nodes {
            ... on Product {
              id
              products {
                thumbnail {
                  primaryColor
                }
                map {
                  logo {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
                banner {
                  logo {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              title
              slug
            }
            contentType {
              node {
                id
                label
                name
                uri
              }
            }
            ... on Service {
              id
              title
              slug
              contentType {
                node {
                  name
                  uri
                  label
                }
              }
              services {
                thumbnail {
                  primaryColor
                }
                map {
                  logo {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
                banner {
                  logo {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
            }
            ... on Software {
              id
              title
              slug
              contentType {
                node {
                  label
                  name
                }
              }
              softwares {
                thumbnail {
                  primaryColor
                }
                banner {
                  logo {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
                map {
                  logo {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
        }
        testimonials {
          nodes {
            ... on Testimonial {
              id
              content
              title
              slug
              testimonials {
                designation
              }
            }
          }
        }
        recordingSectionButton {
          buttonText
          iframe
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        sections {
          content
          sectionTitle
          lottie {
            node {
              altText
              mediaItemUrl
            }
          }
          buttons {
            buttonText
            iframe
            url
            file {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
        mediaContact {
          designation
          name
          email {
            text
          }
          phone {
            text
          }
        }
        about {
          content
          sectionTitle
        }
        insights {
          desc
          title
        }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "post-translations",
		pageID: "/resources/aurora-insights",
	});
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
	const res = await GraphQLAPI(query, {
		apiID: "post",
		pageID: "/resources/aurora-insights",
	});
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
 countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
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
	const res = await GraphQLAPI(query, {
		apiID: "common",
		pageID: "/resources/aurora-insights",
		// taxonomies
	});
	return res;
};

/** Insights Page */
export const getInsightsInside = async (slug) => {
	const query = `
query GetInsightsInside {
  postBy(slug: "${decodeURIComponent(slug)}") {
    title
    slug
    date
    content
    status
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
    categories(first: 9999) {
      nodes {
        slug
        name
      }
    }
    tags(first: 9999) {
      nodes {
        name
        slug
      }
    }
    postFields {
      topSectionButton {
        iframe
        buttonText
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      middleSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      bottomSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      insightsSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }

      time

      authors {
        nodes {
          ... on PostAuthor {
            content
            title
            slug
            postAuthors {
              thumbnail {
                linkedinLink
                designation
                image {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
              articles {
                articlesby(first: 9999) {
                  nodes {
                    ... on Post {
                      id
                      slug
                      title
                      date
                      postFields {
                        time
                      }
                      categories(first: 9999) {
                        nodes {
                          name
                          slug
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      speakers {
        nodes {
          ... on PostSpeaker {
            title
            slug
            postSpeakers {
              thumbnail {
                designation
                linkedinLink
                image {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
      client {
        title
        image {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      podcast
      poweredBy {
        nodes {
          ... on Product {
            id
            products {
              thumbnail {
                primaryColor
              }
              map {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
              banner {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
            title
            slug
          }
          contentType {
            node {
              id
              label
              name
              uri
            }
          }
          ... on Service {
            id
            title
            slug
            contentType {
              node {
                name
                uri
                label
              }
            }
            services {
              thumbnail {
                primaryColor
              }
              map {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
              banner {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
          ... on Software {
            id
            title
            slug
            contentType {
              node {
                label
                name
              }
            }
            softwares {
              thumbnail {
                primaryColor
              }
              banner {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
              map {
                logo {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
      testimonials {
        nodes {
          ... on Testimonial {
            id
            content
            title
            slug
            testimonials {
              designation
            }
          }
        }
      }
      recordingSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      sections {
        content
        sectionTitle
        lottie {
          node {
            altText
            mediaItemUrl
          }
        }
        buttons {
          buttonText
          iframe
          url
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      mediaContact {
        designation
        name
        email {
          text
        }
        phone {
          text
        }
      }
      about {
        content
        sectionTitle
      }
      insights {
        desc
        title
      }
    }
  }
}
    `;

	let res = {};
	try {
		res = await GraphQLAPI(query, {
			apiID: "post",
			pageID: `/resources/aurora-insights/${slug}`,
		});
		return res;
	} catch (error) {
		console.log("error", error);
	}
	return res;
};
