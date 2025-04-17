/* eslint-disable require-jsdoc */
import { ServerHeaders } from "@/utils/RequestHeaders";

export default async function handler(req, res) {
	const { searchTerm } = req.body;
	try {
		const response = await fetch(`${process.env.API_URL}`, {
			method: "POST",
			headers: {
				...ServerHeaders.headers,
			},
			body: JSON.stringify({
				query: `
            query Search($searchTerm: String!) {
                projects(where: { search: ${searchTerm} }) {
                    nodes {
                    id
                    title
                    uri
                    slug
                    __typename
                        projects {
                                banner {
                                    description
                                    bannerImages {
                                    nodes {
                                        altText
                                        sourceUrl
                                    }
                                    }
                                }
                                overview {
                                    title
                                    description
                                    brochureLink
                                    propertyDetails {
                                        location
                                        plotSize
                                        price
                                        propertyType
                                        reraRegistrationCertificateNo
                                        status
                                    }
                                }
                                floorPlans {
                                    sectionTitle
                                    description
                                    floorOptions {
                                        description
                                        title
                                        image {
                                            nodes {
                                                altText
                                                sourceUrl
                                            }
                                        }
                                    }
                                }
                                benefits {
                                    sectionTitle
                                    benefit {
                                        title
                                        description
                                        image {
                                            node {
                                                altText
                                                sourceUrl
                                            }
                                        }
                                    }
                                }
                                features {
                                    sectionTitle
                                    accordion {
                                        title
                                        description
                                        images {
                                            nodes {
                                                altText
                                                sourceUrl
                                            }
                                        }
                                    }
                                }
                                emiTool {
                                    title
                                    description
                                    price
                                    backgroundImage {
                                        node {
                                            altText
                                            sourceUrl
                                        }
                                    }
                                    bankImages {
                                        nodes {
                                            altText
                                            sourceUrl
                                            caption
                                        }
                                    }
                                }

                                mapLocation {
                                    sectionTitle
                                    locations {
                                    title
                                    locationDetails {
                                        name
                                        lat
                                        lon
                                    }
                                    }
                                }
                                contact {
                                    title
                                    image {
                                    node {
                                        altText
                                        sourceUrl
                                    }
                                    }
                                }
                                tour {
                                    title
                                    youtubeEmbedLink
                                    coverImage {
                                        node {
                                            altText
                                            sourceUrl
                                        }
                                    }
                                }
                                policyCopy
                            }
                            projectCategories {
                            nodes {
                                name
                            }
                        }
                    }
                }

                pages(where: { search: $searchTerm }) {
                    nodes {
                        id
                        title
                        slug
                        __typename
                        about {
					chairmanSection {
						title
						description
						name
						designation
						image {
						node {
							altText
							sourceUrl
						}
						}
					}
					milestones {
						sectionTitle
						description
						milestone {
						image {
							node {
							altText
							sourceUrl
							}
						}
						title
						description
						}
					}
					membersSection {
						sectionTitle
						description
						member {
						image {
							node {
							altText
							sourceUrl
							}
						}
						name
						designation
						category
						details
						}
					}
					purposeSection {
						image {
						node {
							altText
							sourceUrl
						}
						}
						title
						description
					}
						timeline {
							timeline {
							bigImage {
								node {
								altText
								sourceUrl
								}
							}
							desc
							smallImage {
								node {
								altText
								sourceUrl
								}
							}
							title
							years
							video {
								node {
								mimeType
								mediaItemUrl
								}
							}
							}
						}
					}

                    home {
                        bannerSlides {
                            title
                            link
                        }
                        belowBanner {
                            sectionTitle
                            description
                            buttonLink
                        }
                        circleSection {
                            sectionTitle
                            sectionTitle2
                            buttonLink
                            projects {
                            projectTitle
                            projectLocation
                            }
                        }
                        planetSection {
                            sectionTitle
                            card1 {
                            title
                            description
                            }
                            card2 {
                            title
                            description
                            }
                            card3 {
                            title
                            description
                            }
                        }
                        contact {
                            title
                            description
                        }
                        certificates {
                            sectionTitle
                            description
                        }
                        communities {
                            sectionTitle
                            project {
                            title
                            description
                            link
                            }
                        }
                        projectCategories {
                            sectionTitle
                            description
                            categories {
                            title
                            description
                            link
                            }
                            buttonLink
                        }
					}

                    contact {
                        contact {
                            title
                            description
                        }
					}

                    }
                }
            }
        `,
				variables: { searchTerm },
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const { data } = await response.json();
		const results = [...data.projects.nodes, ...data.pages.nodes]; // Combine results
		res.status(200).json(results);
	} catch (error) {
		console.error("Error fetching search results:", error);
		res.status(500).json({ error: "Failed to fetch search results" });
	}
}
