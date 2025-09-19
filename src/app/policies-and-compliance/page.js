/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";

// SECTIONS //

// PLUGINS //
import parse from "html-react-parser";

// UTILS //

// STYLES //
import styles from "@/styles/pages/legal/Terms.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getPolicy } from "@/services/Policy.service";
import { getPageSeo } from "@/services/Seo.service";

/** Meta Data */
// export const metadata = {
// 	title: "Policies and Compliance | Aurora",
// 	description: "Aurora",
// };

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo(
		'page(id: "policies-and-compliance", idType: URI)'
	);
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Policies and Compliance | Aurora",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		alternates: {
			canonical: "/policies-and-compliance", // 👈 canonical URL
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

/** Policies and compliance Page */
export default async function PoliciesAndCompliance() {
	const {
		data: {
			page: { title, content },
		},
	} = await getPolicy();
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Policies and Compliance Page"}
				Desc={""}
				OgImg={""}
				Url={"/policies-and-compliance"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.TermsPage}>
				<section className={`${styles.TermsInside} pt_60 pb_100`}>
					<div className="container">
						{/* <h1 className="text_xl font_primary f_w_s_b color_secondary pb_20 text_uppercase">
							POLICIES AND COMPLIANCE
						</h1> */}
						<div className={`${styles.termsContent}`}>
							{content && parse(content)}
							{/* <h2>Privacy Documents</h2>
							<p>
								<a
									href="/img/pdf/Aurora-Privacy-Notice.pdf"
									target="_blank"
									rel="noreferrer"
								>
									Privacy Notice
								</a>
							</p>
							<p>
								<a
									href="/img/pdf/Privacy-Policy-ITA.pdf"
									target="_blank"
									rel="noreferrer"
								>
									Privacy Policy ITA
								</a>
							</p>
							<h2>Anti-Bribery & Corruption Policies</h2>
							<p>
								<a
									href="/img/pdf/Anti-Bribery-and-Corruption-Policy-July-2024.pdf"
									target="_blank"
									rel="noreferrer"
								>
									Anti Bribery and Corruption Policy 2024
								</a>
							</p>
							<h2>Modern Slavery</h2>
							<p>
								<a
									href="/img/pdf/Signed-Modern-Slavery-Statement-26032025.pdf"
									target="_blank"
									rel="noreferrer"
								>
									Modern Slavery Statement (Aurora Energy Research Ltd)
								</a>
							</p>
							<h2>Net Zero Policy</h2>
							<p>
								<a
									href="/img/pdf/Net-Zero-Policy-2025-final.pdf"
									target="_blank"
									rel="noreferrer"
								>
									Net Zero Policy 2025
								</a>
							</p>
							<h2>Whistleblowing Policy</h2>
							<p>
								<a
									href="/pdf/Whistleblowing-Policy-FINAL-April-2025-1.pdf"
									target="_blank"
									rel="noreferrer"
								>
									Whistleblowing Policy 2025
								</a>
							</p>
							<h2>Gender Pay Gap</h2>
							<p>
								<a
									href="https://cms-production.auroraer.com/wp-content/uploads/2025/05/Gender-Pay-Gap-Report-2024.pdf"
									target="_blank"
									rel="noreferrer"
								>
									Gender Pay Gap 2024
								</a>
							</p> */}
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
