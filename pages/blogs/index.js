/* eslint-disable react/no-unescaped-entities */
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DummyComponent from "@/components/DummyComponent";

// SECTIONS //

// PLUGINS //

// IMAGES //

// STYLES //
import styles from "@/styles/pages/Blogs.module.scss";

// SERVICES //
import { getAllBlogs } from "@/services/GlobalPresence.service";

// DATA //
import dummyData from "@/data/tempStrapiData.json";

/** Data Fetching  */
export async function getServerSideProps() {
	// API call to get all Blogs
	const blogs = await getAllBlogs();

	return {
		props: { blogsData: blogs.data },
		// revalidate: 120,
	};
}

/** Blogs Page */
export default function Blogs({ blogsData }) {
	// When fetching data from strapi use blogsData directly instead of dummyData,
	// Here dummyData is used just for demonstration purpose

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
			<Header />

			{/* Page Content Starts */}
			<main className={`${styles.blogs_page}`}>
				<div className="section_spacing">
					<div className="container">
						<div className={`${styles.blog_wrap}`}>
							{dummyData.map((item, index) => {
								return (
									<DummyComponent
										key={item.attributes.title + index}
										title={item.attributes.title}
										desc={item.attributes.desc}
										thumbImage={item.attributes.thumbImage}
									/>
								);
							})}
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
