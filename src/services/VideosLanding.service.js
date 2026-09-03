import GraphQLAPI from "./Graphql.service";

/** Fetch Videos Landing Page */
export const getVideosLandingPage = async () => {
	const query = `
query GetVideosLanding {
  page(id: 66697, idType: DATABASE_ID) {
    videosLanding {
      banner {
        desc
        title
      }
        socialLinks {
        url
        logo {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      video {
        redirectLink
        sectionDesc
        videoLink
        sectionTitle
        iframe
        videoThumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "page",
		tag: ["page:videos-landing", "page:66697"],
		pageID: "/resources/videos",
	});
	return res;
};

/** Fetch Videos Landing Page Social Links */
export const getVideosLandingPageSocialLinks = async () => {
	const query = `
query GetVideosLandingSocialLinks {
  page(id: 66697, idType: DATABASE_ID) {
    videosLanding {
      socialLinks {
        url
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
    `;
	const res = await GraphQLAPI(query, {
		apiID: "page",
		tag: ["page:videos-landing", "page:66697"],
		pageID: "/resources/videos",
	});
	return res;
};
