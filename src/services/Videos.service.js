import { cache } from "react";
import GraphQLAPI from "./Graphql.service";

/** Fetch All Videos */
export const getAllVideos = cache(async (filters = "first:9999") => {
	const query = `
query GetVideosListing {
  videos(${filters}) {
    nodes {
      title
      slug
      content
      videoFields {
        thumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
        topic {
          nodes {
            ... on Page {
              id
              title
              slug
            }
            ... on Software {
              id
              title
              slug
            }
            ... on Product {
              id
              title
              slug
            }
          }
        }
        date
        country {
          nodes {
            ... on Country {
              id
              title
              slug
            }
          }
        }
        videoLink
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "video",
		pageID: "/resources/videos",
	});
	return res;
});
