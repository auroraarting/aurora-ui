import { ServerHeaders } from "@/utils/RequestHeaders";

/** Fetch Blog Data */
export const getAllBlogs = async () => {
	const req = await fetch(
		`${process.env.STRAPI_DO_BASE_URL}/api/blogs?populate=*`,
		ServerHeaders
	);
	const res = await req.json();
	return res;
};

/** Fetch Blogs Inside Data */
export const getBlogBySlug = async (slug) => {
	const req = await fetch(
		`${process.env.STRAPI_DO_BASE_URL}/api/blogs?populate=*&filters[slug][$eq]=${slug}`,
		ServerHeaders
	);
	const res = await req.json();
	return res;
};

/** Fetch Related Blogs Data */
export const getRelatedBlogsBySlug = async (slug) => {
	const req = await fetch(
		`${process.env.STRAPI_DO_BASE_URL}/api/blogs?populate=*&filters[slug][$ne]=${slug}`,
		ServerHeaders
	);
	const res = await req.json();
	return res;
};
