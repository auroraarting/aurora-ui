/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
// import MetaTags from "@/components/MetaTags";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/legal/Terms.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getSafeSender } from "@/services/rest/ContentPage.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo({
		postType: "pages",
		slug: "add-aurora-as-a-safe-sender",
	});
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Add Aurora as a safe sender | Aurora",
		description: seo?.metaDesc || "Aurora",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/add-aurora-as-a-safe-sender", // 👈 canonical URL
		},
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

/** Add Aurora as a safe sender Page */
export default async function AddAuroraAsASafeSender() {
	const res = await getSafeSender();
	const { title, content } = res?.data?.page || {};

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Add Aurora as a safe sender"}
				Desc={""}
				OgImg={""}
				Url={"/add-aurora-as-a-safe-sender"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.TermsPage}>
				<section className={`${styles.TermsInside} pt_60 pb_100`}>
					<div className="container">
						<h1 className="text_xl font_primary f_w_s_b color_secondary pb_20 text_uppercase">
							{title || "Add Aurora as a safe sender"}
						</h1>
						<div className={`${styles.termsContent}`}>
							<ContentFromCms>{content}</ContentFromCms>
						</div>
					</div>
				</section>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
