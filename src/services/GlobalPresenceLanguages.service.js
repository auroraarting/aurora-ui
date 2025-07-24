import { ServerHeaders } from "@/utils/RequestHeaders";
import GraphQLAPI from "./Graphql.service";
import { GraphQLAPILongerRevalidate } from "./Graphql.service";

/** Fetch Regions Data */
export const getRegions = async () => {
	const query = `
 query GetCountryInside {
  regions {
    nodes {
      name
      slug
      countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
        nodes {
          content
          slug
          title
          countries {
            hideonglobalpresence
            map {
              zoom
              countryPin {
                lat
                lng
              }
              markers {
                icon {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
                mapThumbnail {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
                category {
                  nodes {
                    slug
                    contentType {
                      node {
                        name
                      }
                    }
              ... on Service {
                id
                slug
                title
                content
                services {
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
              ... on Software {
                id
                title
                slug
                content
                softwares {
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
              ... on Product {
                id
                title
                slug
                content
                products {
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
                coordinates {
                  lat
                  lng
                }
              }
            }
          }
          featuredImage {
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
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getGlobalPresencePage = async () => {
	const query = `
    query NewQuery {
    page(id: "global-presence", idType: URI) {
      globalPresence {
        title
        mapMarquee
        description
      }
    }
  }
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Country Inside */
export const getCountryInside = async (slug) => {
	const query = `
query GetCountryInsideByTranslation {
  countryBy(slug: "${decodeURIComponent(slug)}") {
    translations {
      slug
      title
      languageCode
      countries {
      hideonglobalpresence
      bannerSection {
        description
        title
        videoLink
        image {
          node {
            altText
            mediaItemUrl
          }
        }
        mobileImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      announcement {
        slide {
          thumbnailImage {
            node {
              altText
              mediaItemUrl
            }
          }
          videoLink
          heading
          description
          buttonText
          buttonLink
        }
      }
      introduction {
        sectionTitle
        tabTitle
        description
      }
      ourOfferings {
        sectionTitle
        tabTitle
      }
      keyAdvantages {
        title
        tabTitle
        description
        advantages {
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
          advantagesTitle
          advantagesDescription
        }
      }
      availableRegions {
        sectionTitle
        tabTitle
        team(first: 9999) {
          nodes {
            ... on Team {
              id
              title
              teams {
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
      }
      ourClients {
        sectionTitle
        tabTitle
        selectLogos(first: 999) {
          nodes {
            ... on ClientsLogo {
              id
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
            }
          }
        }
        testimonials(first: 999) {
          nodes {
            ... on Testimonial {
              id
              title
              content
              testimonials {
                designation
              }
            }
          }
        }
      }
      eventsAndWebinars {
        tabTitle
      }
      insights {
        sectionTitle
        sectionDesc
        list(first: 999) {
          nodes {
            ... on Post {
              id
              date
              title
              slug
              categories(first: 999) {
                nodes {
                  name
                  slug
                }
              }
              postFields {
                time
              }
            }
          }
        }
      }
      map {
        zoom
        countryPin {
          lat
          lng
        }
        markers {
          customDesc
          mapThumbnail {
            node {
              altText
              mediaItemUrl
            }
          }
          category(first: 999) {
            nodes {
              contentType {
                node {
                  name
                }
              }
              ... on Service {
                id
                slug
                title
                content
                services {
                  map {
                    headerLogo {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
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
                content
                softwares {
                  map {
                    headerLogo {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                    logo {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                  }
                }
              }
              ... on Product {
                id
                title
                slug
                content
                products {
                  map {
                    headerLogo {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                    logo {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                  }
                }
              }
              slug
            }
          }
          coordinates {
            lat
            lng
          }
          locationtitle
          bottomText
        }
      }
      mapThumb {
        node {
          altText
          mediaItemUrl
        }
      }
      topSectionsButton {
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
      middleSectionsButton {
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
      keyAdvantageSectionsButton {
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
      availableRegionsSectionsButton {
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
      insightsSectionsButton {
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
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
    }
  }
}
    `;
	const query2 = `
  query GetCountryInsideByTranslation {
  countryBy(slug: "japan") {
    translations {
      slug
      title
      languageCode
      countries {
        hideonglobalpresence
        bannerSection {
          description
          title
          videoLink
          image {
            node {
              altText
              mediaItemUrl
            }
          }
          mobileImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        announcement {
          slide {
            thumbnailImage {
              node {
                altText
                mediaItemUrl
              }
            }
            videoLink
            heading
            description
            buttonText
            buttonLink
          }
        }
        introduction {
          sectionTitle
          tabTitle
          description
        }
        ourOfferings {
          sectionTitle
          tabTitle
        }
        keyAdvantages {
          title
          tabTitle
          description
          advantages {
            icon {
              node {
                altText
                mediaItemUrl
              }
            }
            advantagesTitle
            advantagesDescription
          }
        }
        availableRegions {
          sectionTitle
          tabTitle
          teamTitle
          team(first: 9999) {
            nodes {
              ... on Team {
                id
                translations {
                  title
                  languageCode
                  teams {
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
          }
        }
        ourClients {
          tabTitle
          selectLogos(first: 999) {
            nodes {
              ... on ClientsLogo {
                id
                featuredImage {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
          testimonials(first: 999) {
            nodes {
              ... on Testimonial {
                id
                translations {
                  title
                  content
                  languageCode
                  testimonials {
                    designation
                  }
                }
              }
            }
          }
          sectionTitle
        }
        eventsAndWebinars {
          tabTitle
          sectionTitle
        }
        insights {
          insightsTitle
          sectionTitle
          sectionDesc
          listButtonText
          list(first: 999) {
            nodes {
              ... on Post {
                id
                slug
                translations {
                  date
                  title
                  languageCode
                  categories(first: 999) {
                    nodes {
                      name
                      slug
                    }
                  }
                  postFields {
                    time
                  }
                }
              }
            }
          }
        }
        map {
          zoom
          countryPin {
            lat
            lng
          }
          markers {
            customDesc
            mapThumbnail {
              node {
                altText
                mediaItemUrl
              }
            }
            category(first: 999) {
              nodes {
                contentType {
                  node {
                    name
                  }
                }
                ... on Service {
                  id
                  slug
                  translations {
                    title
                    content
                    services {
                      map {
                        headerLogo {
                          node {
                            altText
                            mediaItemUrl
                          }
                        }
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
                ... on Software {
                  id
                  slug
                  translations {
                    title
                    content
                    softwares {
                      map {
                        headerLogo {
                          node {
                            altText
                            mediaItemUrl
                          }
                        }
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
                ... on Product {
                  id
                  slug
                  translations {
                    title
                    content
                    products {
                      map {
                        headerLogo {
                          node {
                            altText
                            mediaItemUrl
                          }
                        }
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
                slug
              }
            }
            coordinates {
              lat
              lng
            }
            locationtitle
            bottomText
          }
        }
        mapThumb {
          node {
            altText
            mediaItemUrl
          }
        }
        topSectionsButton {
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
        middleSectionsButton {
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
        keyAdvantageSectionsButton {
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
        availableRegionsSectionsButton {
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
        insightsSectionsButton {
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
        fleetOfProducts {
          sectionTitle
          tabTitle
          buttonText
        }
        integratedEnergy {
          content
          sectionTitle
          tabTitle
          buttonText
        }
      }
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
    }
    countries {
      availableRegions {
        team(first: 9999) {
          nodes {
            ... on Team {
              id
              translations {
                title
                languageCode
                teams {
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
        }
      }
      ourClients {
        selectLogos(first: 999) {
          nodes {
            ... on ClientsLogo {
              id
              featuredImage {
                node {
                  translations {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
        testimonials(first: 999) {
          nodes {
            ... on Testimonial {
              id
              translations {
                title
                content
                languageCode
                testimonials {
                  designation
                }
              }
            }
          }
        }
      }
      insights {
        list(first: 999) {
          nodes {
            ... on Post {
              id
              slug
              translations {
                date
                title
                languageCode
                categories(first: 999) {
                  nodes {
                    name
                    slug
                  }
                }
                postFields {
                  time
                }
              }
            }
            ... on Event {
              id
            }
          }
        }
      }
      map {
        markers {
          category(first: 999) {
            nodes {
              ... on Service {
                translations {
                  title
                  content
                  services {
                    map {
                      headerLogo {
                        node {
                          altText
                          mediaItemUrl
                        }
                      }
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
              ... on Software {
                translations {
                  title
                  content
                  softwares {
                    map {
                      headerLogo {
                        node {
                          altText
                          mediaItemUrl
                        }
                      }
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
              ... on Product {
                translations {
                  title
                  content
                  products {
                    map {
                      headerLogo {
                        node {
                          altText
                          mediaItemUrl
                        }
                      }
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
              slug
            }
          }
        }
      }
    }
  }
}
  `;
	// const res = await GraphQLAPI(query);
	const res = await GraphQLAPI(query2);
	// console.log(res2, "res2");
	return res;
};

/** getAllLanguages  */
export const getAllLanguages = async () => {
	const query = `
  query GetAllLanguages {
  languages {
    code
    id
    language_code
    default_locale
    native_name
  }
}
  `;
	const res = await GraphQLAPI(query);
	return res;
};
