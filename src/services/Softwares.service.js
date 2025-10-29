import { count } from "console";
import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getSingleSoftware = async (slug) => {
	const query = `
query GetProductBySlug {
  countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
    nodes {
      title
      slug
    }
  }
  softwareBy(slug: "${decodeURIComponent(slug)}") {
    title
    slug
    softwares {
      thumbnail {
        banner {
          node {
            altText
            mediaItemUrl
          }
        }
        logo {
          node {
            mediaItemUrl
            altText
          }
        }
        gradient {
          from
          to
        }
        primaryColor
        title
        shortDescription
        spotlightTitle
        spotlightDesc
      }
      ourClient {
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
              content
              title
              testimonials {
                designation
              }
            }
          }
        }
      }
      availableRegions {
        marqueeText
        tabTitle
      }
      banner {
        logo {
          node {
            altText
            mediaItemUrl
          }
        }
        buttonText
        buttonLink
        description
        title
        vimeoLink
        desktopThumbnail {
          node {
            altText
            mediaItemUrl
            mediaItemUrl
          }
        }
        mobileThumbnail {
          node {
            altText
            mediaItemUrl
            mediaItemUrl
          }
        }
      }
      caseStudy {
        tabTitle
        title
        selectCaseStudies {
          nodes {
            ... on Post {
              id
              title
              slug
              content
              date
              categories(first: 9999) {
                nodes {
                  slug
                  name
                }
              }
              postFields {
                time
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
      expertSupport {
        sectionTitle
        image {
          node {
            altText
            mediaItemUrl
          }
        }
        list {
          title
          description
          logo {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      benefits {
        sectionTitle
        image {
          node {
            altText
            mediaItemUrl
          }
        }
        list {
          title
          description
          logo {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      expertise {
        description
        tabTitle
        title
        expertiseAccordion {
          accordionDescription
          accordionTitle
          buttonLink
          buttonText
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      whatSetsUsApart {
        description
        tabTitle
        title
        expertiseAccordion {
          accordionDescription
          accordionTitle
          buttonLink
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      introduction {
        description
        tabTitle
        title
        image {
          node {
            altText
            mediaItemUrl
            mediaItemUrl
          }
        }
        lottie {
          node {
            altText
            mediaItemUrl
            mediaItemUrl
          }
        }
      }
      keyAdvantages {
        desciption
        tabTitle
        title
        buttonLink
        buttonText
        advantages {
          advantagesTitle
          advantagesDescription
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      map {
        marquee
        headerLogo {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      whyAurora {
        title
        description
        startText
        endText
        endPoint
        list {
          title
          description
          caption
          value
        }
      }
      fourStepProcess {
        buttonLink
        description
        processTitle
        tabTitle
        process {
          image {
            node {
              altText
              mediaItemUrl
            }
          }
          video {
            node {
              altText
              mediaItemUrl
            }
          }
          processDetails {
            description
          }
        }
      }
      topSectionButton {
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
      middleSectionButton {
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
      stepsSectionButton {
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
      insightsSectionButton {
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
      insights {
        sectionDesc
        sectionTitle
        list(first: 9999) {
          nodes {
            ... on Post {
              id
              title
              slug
              postFields {
                time
              }
              categories(first: 9999) {
                nodes {
                  slug
                  name
                }
              }
              date
            }
          }
        }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "softwares",
		pageID: `/software/${slug}`,
		// taxonomies
	});
	return res;
};

/** Fetch Page */
export const getSoftwarePage = async () => {
	const query = `
query GetPageSoftwares {
  page(id: "software", idType: URI) {
    title
    slug
    softwareLanding {
      banner {
        title
        description
      }
      mapMarquee
      inisghtsSectionButton {
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
      insights {
        sectionDesc
        sectionTitle
      }
      whyAurora {
        endPoint
        description
        endText
        startText
        title
        list {
          caption
          description
          title
          value
        }
      }
    }
  }
  softwares(first: 999) {
    nodes {
      title
      slug
      softwares {
        thumbnail {
          banner {
            node {
              altText
              mediaItemUrl
            }
          }
          logo {
            node {
              mediaItemUrl
              altText
            }
          }
          gradient {
            from
            to
          }
          title
          shortDescription
          spotlightTitle
          spotlightDesc
        }
        ourClient {
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
                content
                title
                testimonials {
                  designation
                }
              }
            }
          }
        }
      }
    }
  }
}
      `;
	const res = await GraphQLAPI(query, {
		apiID: "common",
		pageID: "/software",
	});
	return res;
};

/** Fetch Page */
export const getSingleSoftwareByLanguage = async (slug, language) => {
	const query = `
query GetProductBySlug {
  countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
    nodes {
      title
      slug
      translations{
        title
      }
    }
  }
  softwareBy(slug: "${decodeURIComponent(slug)}") {
    title
    slug
    softwares {
      thumbnail {
        banner {
          node {
            altText
            mediaItemUrl
          }
        }
        logo {
          node {
            mediaItemUrl
            altText
          }
        }
        gradient {
          from
          to
        }
        primaryColor
        title
        shortDescription
        spotlightTitle
        spotlightDesc
      }
      ourClient {
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
        testimonials(first: 999) {
          nodes {
            ... on Testimonial {
              id
              content
              title
              testimonials {
                designation
              }
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
              content
              title
                testimonials {
                designation
              }
              }
            }
          }
        }
      }
      availableRegions {
        marqueeText
        tabTitle
      }
      banner {
        logo {
          node {
            altText
            mediaItemUrl
          }
        }
        buttonText
        buttonLink
        description
        title
        vimeoLink
        desktopThumbnail {
          node {
            altText
            mediaItemUrl
            mediaItemUrl
          }
        }
        mobileThumbnail {
          node {
            altText
            mediaItemUrl
            mediaItemUrl
          }
        }
      }
      caseStudy {
        tabTitle
        title
        selectCaseStudies {
          nodes {
            ... on Post {
              id
              title
              slug
              content
              date
              categories(first: 9999) {
                nodes {
                  slug
                  name
                  translations{
                    slug
                    name
                  }
                }
              }
              postFields {
                time
              }
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
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
                title
                slug
                content
                date
                featuredImage {
                  node {
                    altText
                    mediaItemUrl
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
      expertSupport {
        sectionTitle
        image {
          node {
            altText
            mediaItemUrl
          }
        }
        list {
          title
          description
          logo {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      benefits {
        sectionTitle
        image {
          node {
            altText
            mediaItemUrl
          }
        }
        list {
          title
          description
          logo {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      expertise {
        description
        tabTitle
        title
        expertiseAccordion {
          accordionDescription
          accordionTitle
          buttonLink
          buttonText
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      whatSetsUsApart {
        description
        tabTitle
        title
        expertiseAccordion {
          accordionDescription
          accordionTitle
          buttonLink
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      introduction {
        description
        tabTitle
        title
        image {
          node {
            altText
            mediaItemUrl
            mediaItemUrl
          }
        }
        lottie {
          node {
            altText
            mediaItemUrl
            mediaItemUrl
          }
        }
      }
      keyAdvantages {
        desciption
        tabTitle
        title
        buttonLink
        buttonText
        advantages {
          advantagesTitle
          advantagesDescription
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      map {
        marquee
        headerLogo {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      whyAurora {
        title
        description
        startText
        endText
        endPoint
        list {
          title
          description
          caption
          value
        }
      }
      fourStepProcess {
        buttonLink
        description
        processTitle
        tabTitle
        process {
          image {
            node {
              altText
              mediaItemUrl
            }
          }
          video {
            node {
              altText
              mediaItemUrl
            }
          }
          processDetails {
            description
          }
        }
      }
      topSectionButton {
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
      middleSectionButton {
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
      stepsSectionButton {
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
      insightsSectionButton {
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
      insights {
        sectionDesc
        sectionTitle
        insightsTitle
        listButtonText
        list(first: 9999) {
          nodes {
            ... on Post {
              id
              title
              slug
              postFields {
                time
              }
              categories(first: 9999) {
                nodes {
                  slug
                  name
                  translations{
                    slug
                    name
                  }
                }
              }
              date
              translations{
                slug
                title
                date
                postFields {
                time
              }
              }
            }
          }
        }
      }
      integratedSystem{
        tabTitle
        desc
        buttonText
        buttonLink
      }
    }
    translations {
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
      title
      softwares {
        thumbnail {
          banner {
            node {
              altText
              mediaItemUrl
            }
          }
          logo {
            node {
              mediaItemUrl
              altText
            }
          }
          gradient {
            from
            to
          }
          primaryColor
          title
          shortDescription
          spotlightTitle
          spotlightDesc
        }
        ourClient {
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
                content
                title
                testimonials {
                  designation
                }
              }
            }
          }
        }
        availableRegions {
          marqueeText
          tabTitle
        }
        banner {
          logo {
            node {
              altText
              mediaItemUrl
            }
          }
          buttonText
          buttonLink
          description
          title
          vimeoLink
          desktopThumbnail {
            node {
              altText
              mediaItemUrl
              mediaItemUrl
            }
          }
          mobileThumbnail {
            node {
              altText
              mediaItemUrl
              mediaItemUrl
            }
          }
        }
        caseStudy {
          tabTitle
          title
          selectCaseStudies {
            nodes {
              ... on Post {
                id
                title
                slug
                content
                date
                categories(first: 9999) {
                  nodes {
                    slug
                    name
                  }
                }
                postFields {
                  time
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
        expertSupport {
          sectionTitle
          image {
            node {
              altText
              mediaItemUrl
            }
          }
          list {
            title
            description
            logo {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
        benefits {
          sectionTitle
          image {
            node {
              altText
              mediaItemUrl
            }
          }
          list {
            title
            description
            logo {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
        expertise {
          description
          tabTitle
          title
          expertiseAccordion {
            accordionDescription
            accordionTitle
            buttonLink
            buttonText
            icon {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
        whatSetsUsApart {
          description
          tabTitle
          title
          expertiseAccordion {
            accordionDescription
            accordionTitle
            buttonLink
            icon {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
        introduction {
          description
          tabTitle
          title
          image {
            node {
              altText
              mediaItemUrl
              mediaItemUrl
            }
          }
          lottie {
            node {
              altText
              mediaItemUrl
              mediaItemUrl
            }
          }
        }
        keyAdvantages {
          desciption
          tabTitle
          title
          buttonLink
          buttonText
          advantages {
            advantagesTitle
            advantagesDescription
            icon {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
        map {
          marquee
          headerLogo {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        whyAurora {
          title
          description
          startText
          endText
          endPoint
          list {
            title
            description
            caption
            value
          }
        }
        fourStepProcess {
          buttonLink
          description
          processTitle
          tabTitle
          process {
            image {
              node {
                altText
                mediaItemUrl
              }
            }
            video {
              node {
                altText
                mediaItemUrl
              }
            }
            processDetails {
              description
            }
          }
        }
        topSectionButton {
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
        middleSectionButton {
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
        stepsSectionButton {
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
        insightsSectionButton {
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
        insights {
          sectionDesc
          sectionTitle
          insightsTitle
        listButtonText
          list(first: 9999) {
            nodes {
              ... on Post {
                id
                title
                slug
                postFields {
                  time
                }
                categories(first: 9999) {
                  nodes {
                    slug
                    name
                  }
                }
                date
              }
            }
          }
        }
        integratedSystem{
        tabTitle
        desc
        buttonText
        buttonLink
      }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "softwares",
		pageID: `/software/${slug}/${language}`,
		// taxonomies
	});
	let newRes =
		res?.data?.softwareBy?.translations?.filter(
			(countryItem) => countryItem.language.code === language
		)[0] || res?.data?.softwareBy;

	if (res?.data?.softwareBy?.softwares?.ourClient?.testimonials?.nodes) {
		newRes.softwares.ourClient.testimonials.nodes =
			res?.data?.softwareBy.softwares.ourClient.testimonials.nodes.map((item) => {
				const dataByLang = item.translations.filter(
					(item2) => item2.language.language_code === language
				)?.[0];
				return { ...item, ...dataByLang };
			});
	}
	if (res?.data?.softwareBy?.softwares?.ourClient?.selectLogos?.nodes) {
		newRes.softwares.ourClient.selectLogos.nodes =
			res?.data?.softwareBy.softwares.ourClient.selectLogos.nodes?.map((item) => {
				return {
					...item,
					featuredImage: {
						node:
							item?.featuredImage?.node?.translations?.filter(
								(item2) => item2?.language.code === language
							)?.[0] || item?.featuredImage?.node,
					},
				};
			});
	}

	if (res?.data?.softwareBy?.softwares?.insights?.list?.nodes) {
		newRes.softwares.insights.list.nodes =
			res.data.softwareBy.softwares.insights.list.nodes?.map((item) => {
				if (item?.translations?.length === 0) {
					return item;
				}
				let temp1 =
					item?.translations?.filter(
						(item2) => item2?.language?.language_code === language
					)?.[0] || [];
				return {
					...item,
					...temp1,
					categories: {
						nodes: item?.categories?.nodes?.map((item3) => ({
							...item3,
							// ...item2?.translations?.[0],
							alternateName: item3?.translations?.filter(
								(item4) => item4?.language?.language_code === language
							)?.[0]?.name,
						})),
					},
				};
			});
	}

	if (res?.data?.softwareBy?.softwares?.caseStudy.selectCaseStudies.nodes) {
		newRes.softwares.caseStudy.selectCaseStudies.nodes =
			res?.data?.softwareBy.softwares.caseStudy.selectCaseStudies.nodes.map(
				(item) => {
					const dataByLang = item.translations.filter(
						(item2) => item2.language.language_code === language
					)?.[0];
					return { ...item, ...dataByLang };
				}
			);
	}
	// newRes.data.softwareBy.softwares.caseStudy.selectCaseStudies.nodes =
	// 	res.data.softwareBy.softwares.caseStudy.selectCaseStudies.nodes;
	const newObj = {
		data: {
			countries: res.data.countries,
			softwareBy: {
				...res.data.softwareBy,
				...newRes,
			},
		},
	};

	return newObj;
};
