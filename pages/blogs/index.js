/* eslint-disable react/no-unescaped-entities */

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DummyComponent from "@/components/DummyComponent";

// STYLES //
import styles from "@/styles/pages/Blogs.module.scss";

// SERVICES //
import { getAllBlogs } from "@/services/GlobalPresence.service"; // ✅ Make sure this is a named export

/** Data Fetching */
export async function getServerSideProps() {
	try {
		const blogs = await getAllBlogs();

		return {
			props: { blogsData: blogs.data },
		};
	} catch (error) {
		console.error("Error fetching blogs:", error);
		return {
			props: { blogsData: [] }, // fallback to empty if error
		};
	}
}

/** Blogs Page */
export default function Blogs({ blogsData }) {
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Blogs"}
				Desc={""}
				Keywords={""}
				OgImg={""}
				Url={"/blogs"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content Starts */}
			<main className={`${styles.blogs_page}`}>
				<div className="section_spacing">
					<div className="container">
						<div className={styles.blog_wrap}>
							{blogsData.length > 0 ? (
								blogsData.map((item, index) => (
									<DummyComponent
										key={item.attributes.title + index}
										title={item.attributes.title}
										desc={item.attributes.desc}
										thumbImage={item.attributes.thumbImage}
									/>
								))
							) : (
								<p>No blogs found.</p>
							)}
						</div>
					</div>
				</div>
			</main>
			{/* Page Content Ends */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
