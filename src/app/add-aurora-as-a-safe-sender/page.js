/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.
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
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "add-aurora-as-a-safe-sender");
	const seo = meta?.seo;

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
	// getSafeSender now returns the page node directly.
	const { title, content } = (await getSafeSender()) || {};

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
