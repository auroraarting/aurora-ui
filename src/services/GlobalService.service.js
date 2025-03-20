import { ServerHeaders } from "@/utils/RequestHeaders";
import GraphQLAPI from "./Graphql.service";

/** Fetch Blog Data */
export const getRegions = async () => {
	const query = `
        query NewQuery {
            regions {
                nodes {
                name
                slug
                countries {
                    nodes {
                        title
                        slug
                        }
                    }
                }
            }
        }`;
	const res = await GraphQLAPI(query);
	return res;
};

// /** Fetch Blogs Inside Data */
// export const getBlogBySlug = async (slug) => {
// 	const req = await fetch(
// 		`${process.env.STRAPI_DO_BASE_URL}/api/blogs?populate=*&filters[slug][$eq]=${slug}`,
// 		ServerHeaders
// 	);
// 	const res = await req.json();
// 	return res;
// };

// /** Fetch Related Blogs Data */
// export const getRelatedBlogsBySlug = async (slug) => {
// 	const req = await fetch(
// 		`${process.env.STRAPI_DO_BASE_URL}/api/blogs?populate=*&filters[slug][$ne]=${slug}`,
// 		ServerHeaders
// 	);
// 	const res = await req.json();
// 	return res;
// };
