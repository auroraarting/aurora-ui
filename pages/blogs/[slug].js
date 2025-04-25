// pages/blogs/[slug].js

import MetaTags from "@/components/MetaTags";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "@/styles/pages/BlogsInside.module.scss";
import {
	getBlogBySlug,
	getRelatedBlogsBySlug,
} from "@/services/GlobalPresence.service";

/** Data Fetching */
export async function getStaticPaths() {
	const allBlogs = await getRelatedBlogsBySlug(); // Or a dedicated endpoint to fetch all slugs
	const paths = allBlogs.data.map((blog) => ({
		params: { slug: blog.attributes.slug },
	}));
	return { paths, fallback: "blocking" };
}

/** Data Fetching */
export async function getStaticProps({ params }) {
	const blogsInsideData = await getBlogBySlug(params.slug);
	const relatedBlogData = await getRelatedBlogsBySlug(params.slug);

	return {
		props: {
			blogsInsideData: blogsInsideData.data[0].attributes,
			relatedBlogData: relatedBlogData.data,
		},
		revalidate: 120,
	};
}

/** Data Fetching */
export default function BlogsInside({ blogsInsideData }) {
	return (
		<div>
			<MetaTags
				Title={`${blogsInsideData.title}`}
				Desc={blogsInsideData.description || ""}
				Keywords={blogsInsideData.keywords || ""}
				OgImg={blogsInsideData.image || ""}
				Url={`/blogs/${blogsInsideData.slug}`}
			/>
			{/* <Header /> */}
			<main className={`${styles.blogs_inside_page} no_banner_page`}>
				{/* Content */}
			</main>
			<Footer />
		</div>
	);
}
