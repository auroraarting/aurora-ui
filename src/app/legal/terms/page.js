/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
// import MetaTags from "@/components/MetaTags";

// SECTIONS //

// PLUGINS //
import parse from "html-react-parser";

// UTILS //

// STYLES //
import styles from "@/styles/pages/legal/Terms.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

// SERVICES //
import { getTerms } from "@/services/Terms.service";
import { getPageSeo } from "@/services/Seo.service";

/** Meta Data */
// export const metadata = {
// 	title: "Terms | Aurora",
// 	description: "Aurora",
// };

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "terms", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Terms | Aurora",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/legal/terms", // 👈 canonical URL
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

/** Terms Page */
export default async function Terms() {
	const {
		data: {
			page: { title, content },
		},
	} = await getTerms();
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Terms"} Desc={""} OgImg={""} Url={"/terms"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.TermsPage}>
				<section className={`${styles.TermsInside} pt_60 pb_100`}>
					<div className="container">
						{/* <h1 className="text_xl font_primary f_w_s_b color_secondary pb_20 text_uppercase">
							Terms of use
						</h1> */}
						<div className={`${styles.termsContent}`}>
							{content && parse(content)}
							{/* <h2>Introduction</h2>
							<p>
								This website (the “Site”) is operated by Aurora Energy Research Limited
								(“Aurora”). Throughout the Site, the terms “we,” “us” and “our” refer to
								Aurora. Aurora offers this Site, including all information, materials,
								tools and services available on or accessible from this Site, to you,
								the user, conditional upon your acceptance of all the terms, conditions,
								policies and notices stated in these Terms of Use (“Terms”), and you
								agree to comply with all applicable laws and regulations, including
								export control laws and regulations. Your use of this Site constitutes
								your agreement to these Terms, and by using this Site you agree to be
								bound by these Terms. If you do not agree to be bound by these Terms,
								please exit the Site now and refrain from using any materials that you
								may have downloaded from the Site.
							</p>
							<h2>Use of the Site</h2>
							<p>
								You may access and use this Site solely for lawful purposes and only in
								accordance with the terms of this Agreement. This Site and its contents
								are intended for informational and non-commercial use only. Aurora
								reserves the right at any time and in its sole discretion to modify,
								suspend, or discontinue the Site (or any portion thereof), or revise
								these Terms, or suspend or terminate your access to the Site or any
								portion thereof, with or without notice. The information contained on
								the Site is subject to change at any time without prior notice. Aurora
								may also make improvements or changes in the products or services
								described in this Site at any time without notice.
							</p>
							<h2>Use of content</h2>
							<p>
								All content provided on or offered through this Site (including, but not
								limited to, text, files, images, graphics, illustrations, audio, video,
								and photographs) (collectively, “Content”) is owned by Aurora and/or its
								partners, affiliates, and licensors (“Affiliates”). This Content is
								protected by United Kingdom and international intellectual property
								rights, including, as applicable and without limitation, copyrights,
								trademarks and patents, (“Intellectual Property Rights”). Aurora and its
								licensors retain all ownership rights in, and proprietary rights to, the
								Content. Unless otherwise labelled, all trademarks, service marks,
								logos, banners, and page headers displayed on this Site (collectively,
								“Marks”) are the property of Aurora and its Affiliates.
							</p>
							<p>
								Your access to or use of our Content is subject to the Terms, including
								the following:
							</p>
							<ul>
								<li>
									You may use the Content solely as displayed on the Site and may not
									download or otherwise copy any Content without prior written permission
									of Aurora. Private use of the contents including copying, and printing
									the contents for private purposes is permitted.
								</li>
								<li>
									You may use the Content only in the form provided on or through the
									Site and may not modify, amend, or combine any Content with other
									materials to form any new content. You may not display, link to, or
									otherwise use the Marks without the prior written permission of Aurora,
									which Aurora may grant or deny in its sole discretion.
								</li>
								<li>
									You must obtain all copies or reproductions of the Content directly
									from Aurora. You obtain no ownership rights in or to the Site or its
									Content through these Terms, and no other rights to utilise, reproduce,
									display or publicly perform the Content, except as expressly set forth
									in these Terms.
								</li>
							</ul>
							<p>
								Except as otherwise expressly stated, you are granted no licenses or
								rights, whether by implication, estoppel, or otherwise, in or to the
								Site or its Content, or any Intellectual Property Rights. In addition,
								you may not copy, modify, reproduce, perform, display, create derivative
								works from, republish, post, transmit, participate in the transfer or
								sale of, distribute, or in any way exploit any portion of the Site or
								its Content without the prior written permission of Aurora.
							</p>
							<p>
								Notwithstanding the above, any software and other materials that are
								made available for downloading, access, or other use from this Site with
								their own license terms, conditions, and notices will be governed by
								such terms, conditions, and notices.
							</p>
							<h2>Forward-looking and cautionary statements</h2>
							<p>
								Except for historical information and discussions, statements set forth
								throughout this Site may constitute forward-looking statements. These
								statements involve a number of risks, uncertainties, and other factors
								that could cause actual results to differ materially. By using this Site
								you accept and understand these risks.
							</p>
							<h2>Postings and uploads</h2>
							<p>
								Aurora does not want to receive confidential or proprietary information
								from you through the Site. Please note that any information or material
								sent to Aurora will be deemed NOT to be confidential. By sending Aurora
								any information or material, you grant Aurora an unrestricted,
								irrevocable license to copy, reproduce, publish, upload, post, transmit,
								distribute, publicly display, perform, modify, create derivative works
								from, and otherwise freely use, those materials or information. You also
								agree that Aurora is free to use any ideas, concepts, know-how, or
								techniques that you send us for any purpose. However, we will not
								release your name or otherwise publicise the fact that you submitted
								materials or other information to us unless: (a) we obtain your
								permission to use your name; or (b) we first notify you that the
								materials or other information you submit to a particular part of this
								Site will be published or otherwise used with your name on it; or (c) we
								are required to do so by law. Personally identifiable information that
								you submit to Aurora for the purpose of receiving products or services
								will be handled in accordance with our privacy notice. Please see the
								paragraph entitled “Privacy Notice” for information regarding the Aurora
								privacy notice.
							</p>
							<h2>Claims of infringement</h2>
							<p>
								Aurora respects the intellectual property rights of others and requests
								that you do the same. If you believe that copyright or intellectual
								property rights held by you or a person on whose behalf you are
								authorised to act have been infringed, you may notify us at the
								following address: St Aldates Chambers, 109-113 St Aldates, Oxford, OX1
								1DS, United Kingdom or at the following email address:{" "}
								<a href="mailto:Aurora_Legal_EMEA@auroraer.com.">
									Aurora_Legal_EMEA@auroraer.com.
								</a>
							</p>
							<h2>You must provide the following information:</h2>
							<p>
								Identification of the material that is claimed to be infringing and that
								is to be removed or access to which is to be disabled, and location of
								such material;
							</p>
							<p>
								In case of a claim of copyright infringement, identification of the
								copyrighted work claimed to have been infringed, or if multiple
								copyrighted works at a single online site are covered by a single
								notification, a representative list of such works at that site;
							</p>
							<ul>
								<li>
									Your name, address, daytime phone number, and email address, if
									available;
								</li>
								<li>
									A statement that you have a good-faith belief that the use of the work
									is not authorised by the owner, his or her agent, or the law;
								</li>
								<li>
									A statement that the information in the notification is accurate and,
									under penalty of perjury, that you are authorised to act on behalf of
									the owner;
								</li>
								<li>
									A copy of any copyright or related registration evidencing your claim
									or intellectual property right or ownership; and
								</li>
								<li>
									A physical signature reflecting that you are authorised to act on
									behalf of the owner of an exclusive right that is allegedly infringed.
								</li>
							</ul>
							<h2>Disclaimers</h2>
							<p>
								THIS SITE IS PROVIDED BY AURORA “AS IS” AND “AS AVAILABLE” WITH NO
								EXPRESS OR IMPLIED WARRANTIES WHATSOEVER. NEITHER AURORA NOR ITS
								AFFILIATES WARRANT OR ENDORSE THE ACCURACY, RELIABILITY OR FITNESS FOR A
								PARTICULAR PURPOSE OF ANY ADVICE, OPINION, STATEMENT, OR OTHER
								INFORMATION DISPLAYED ON, DOWNLOADED FROM, DISTRIBUTED THROUGH, OR
								OTHERWISE AVAILABLE FROM THE SITE. IT IS YOUR RESPONSIBILITY TO EVALUATE
								THE ACCURACY, COMPLETENESS OR USEFULNESS OF ANY INFORMATION, OPINION,
								ADVICE OR OTHER CONTENT AVAILABLE THROUGH THE SITE. YOU AGREE THAT YOUR
								ACCESS TO THE SITE IS AT YOUR OWN RISK AND THAT YOU ARE SOLELY
								RESPONSIBLE FOR ANY LIABILITY OR DAMAGE YOU INCUR BY ACCESSING THE SITE.
								EXCEPT WHERE THE LAWS AND REGULATIONS OR A PARTICULAR JURISDICTION
								CONCERNING WARRANTIES CANNOT BE WAIVED OR EXCLUDED BY AGREEMENT, AURORA
								EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED,
								REGARDING THE SITE, INCLUDING, WITHOUT LIMITATION, ALL WARRANTIES OF
								TITLE, NON-INFRINGEMENT, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR
								PURPOSE. YOU RECOGNISE THAT THE CURRENT STATE OF TECHNOLOGY DOES NOT
								ALLOW FOR ERROR-FREE ACCESS TO THE SITE AND INTERRUPTIONS, CRASHES, AND
								DOWNTIME BEYOND AURORA’S CONTROL MAY OCCUR FROM TIME TO TIME.
							</p>
							<h2>Limitation of liability</h2>
							<p>
								IN NO EVENT WILL AURORA OR ITS AFFILIATES BE LIABLE FOR ANY DIRECT,
								CONSEQUENTIAL, SPECIAL, INDIRECT, EXEMPLARY, OR PUNITIVE DAMAGES,
								WHETHER IN CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, IN CONNECTION
								WITH, AS A RESULT OF OR ARISING OUT OF: (a) YOUR ACCESS TO OR USE OF THE
								SITE OR CONTENT, (b) YOUR INABILITY TO USE THE SITE OR CONTENT; (c) ANY
								LOSS OF DATA AND/OR EQUIPMENT FAILURE; (d) STATEMENTS OR CONDUCT OF ANY
								THIRD PARTY ON THE SITE; (e) DELAY OR FAILURE OF THE SITE ARISING OUT OF
								CAUSES BEYOND OUR CONTROL; (f) YOUR USE OF, REFERENCE TO, OR RELIANCE
								ON, THE CONTENT; (g) ANY THIRD PARTY MATERIALS, INFORMATION, PRODUCTS
								AND SERVICES CONTAINED ON, OR ACCESSED THROUGH, THE SITE; OR (h) ANY
								OTHER MATTER RELATING TO THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE
								POSSIBILITY OF SUCH DAMAGES. YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY OF
								THE ABOVE CLAIMS OR ANY DISPUTE WITH AURORA IS TO DISCONTINUE YOUR USE
								OF THE SITE AND CONTENT. FOR THE AVOIDANCE OF DOUBT, WE DO NOT EXCLUDE
								OUR LIABILITY FOR DEATH, PERSONAL INJURY OR FRAUD.
							</p>
							<h2>Indemnification</h2>
							<p>
								You hereby agree to indemnify, defend, and hold harmless Aurora and its
								Affiliates and each of their officers, directors, employees, agents,
								contractors, assigns, licensors, sublicensors, service providers,
								suppliers, and successors in interest from any and all claims, losses,
								liabilities, damages, fees, expenses, and costs (including attorneys’
								fees, court costs, damage awards, and settlement amounts) that result or
								arise from your use of the Site and any violation of these Terms. Aurora
								will provide you with notice of any such claim or allegation, and Aurora
								will have the right to participate in the defence of any such claim at
								its expense.
							</p>
							<h2>Privacy Notice</h2>
							<p>
								The Aurora Website Privacy Notice is incorporated herein by reference.
								By agreeing to these Terms you expressly consent to the use and
								disclosure of your information as described in the{" "}
								<a
									href="/img/pdf/Aurora-Privacy-Notice.pdf"
									target="_blank"
									rel="noreferrer"
								>
									Website Privacy Notice
								</a>
								.
							</p>
							<h2>Linked sites</h2>
							<p>
								Linking of this Site to another requires Aurora’s prior written
								approval. Aurora does not verify, warrant, endorse or take
								responsibility for the availability, accuracy, completeness or quality
								of the content contained on third party linked sites. If you access a
								third-party linked site from this Site, then you do so at your own risk.
							</p>
							<h2>External links</h2>
							<p>
								This Site may provide links or references to non-Aurora sites and
								resources. Aurora makes no representations, warranties, or other
								commitments whatsoever about any non-Aurora sites or third-party
								resources that may be referenced, accessible from, or linked to any
								Aurora site. A link to a non-Aurora site does not mean that Aurora
								endorses the content or use of such site or its owner. In addition,
								Aurora is not a party to or responsible for any transactions you may
								enter into with third parties, even if you learn of such parties (or use
								a link to such parties) from an Aurora site. Accordingly, you
								acknowledge and agree that Aurora is not responsible for the
								availability of such external sites or resources, and is not responsible
								or liable for any content, services, products, or other materials on or
								available from those sites or resources. It is up to you to take
								precautions to protect yourself from viruses, worms, trojan horses, and
								other potentially destructive programs, and to protect your information
								as you deem appropriate.
							</p>
							<h2>Translations</h2>
							<p>
								Certain text in this Site may be made available in languages other than
								English. Text may be translated by a person or solely by computer
								software with no human intervention or review. These translations are
								provided as a convenience to you, and Aurora makes no representations or
								commitments regarding the accuracy or completeness of the translation,
								whether or not computer-generated or performed by a person. In the event
								of any discrepancy between translations, the English text shall prevail.
							</p>
							<h2>Severability</h2>
							<p>
								If any provision of this agreement is found invalid or unenforceable in
								any jurisdiction, then that provision will be deemed superseded by a
								valid, enforceable provision that most closely matches the intent of the
								original provision, and the remaining portions will remain in full force
								and effect.
							</p>
							<h2>Jurisdiction and venue</h2>
							<p>
								These terms and conditions are governed by English law and the parties
								agree to submit to the exclusive jurisdiction of the English courts.
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
