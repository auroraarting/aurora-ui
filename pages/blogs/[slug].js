// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// SECTIONS //

// PLUGINS //

// IMAGES //

// STYLES //
import styles from "@/styles/pages/BlogsInside.module.scss";

// SERVICES //
import {
	getBlogBySlug,
	getRelatedBlogsBySlug,
} from "@/services/GlobalPresence.service";

// UTILS //

/** Data Fetching */
export async function getServerSideProps({ params }) {
	// API call to get Current Blog
	const blogsInsideData = await getBlogBySlug(params.slug);
	// API call to get Related Blogs
	const relatedBlogData = await getRelatedBlogsBySlug(params.slug);

	return {
		props: {
			blogsInsideData: blogsInsideData.data[0].attributes,
			relatedBlogData: relatedBlogData.data,
		}, // will be passed to the page component as props
		// revalidate: 120,
	};
}

/** Blogs Inside Page */
export default function BlogsInside({ blogsInsideData }) {
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={`${blogsInsideData.title}`}
				Desc={""}
				Keywords={""}
				OgImg={""}
				Url={`/blogs/${blogsInsideData.slug}`}
			/>
			{/* Header */}
			{/* <Header /> */}

			{/* Page Content Starts */}
			<main className={`${styles.blogs_inside_page} no_banner_page`}></main>
			{/* Page Content Ends */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
