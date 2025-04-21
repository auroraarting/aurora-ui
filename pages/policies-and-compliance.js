// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/legal/Terms.module.scss";

// IMAGES //

// DATA //

/** Policies and compliance Page */
export default function PoliciesAndCompliance() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Policies and Compliance Page"}
				Desc={""}
				OgImg={""}
				Url={"/policies-and-compliance"}
			/>

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={styles.TermsPage}>
				<section className={`${styles.TermsInside} ptb_100`}>
					<div className="container">
						<h1 className="text_xl font_primary f_w_s_b color_secondary pb_20 text_uppercase">
							POLICIES AND COMPLIANCE
						</h1>
						<div className={`${styles.termsContent}`}>
							<h2>Privacy Documents</h2>
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
