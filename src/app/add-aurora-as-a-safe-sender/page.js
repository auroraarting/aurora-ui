// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/legal/Terms.module.scss";

// IMAGES //

// DATA //

/** Meta Data */
export const metadata = {
	title: "Add Aurora as a safe sender | Aurora",
	description: "Aurora",
	alternates: {
		canonical: "https://auroraer.com/add-aurora-as-a-safe-sender", // 👈 canonical URL
	},
};

/** Policies and compliance Page */
export default function PoliciesAndCompliance() {
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
						<h1 className="text_xl font_primary f_w_s_b color_secondary pb_20 text_uppercase">
							Add Aurora as a safe sender
						</h1>
						<div className={`${styles.termsContent}`}>
							<p>
								To ensure our latest news and subscriber updates arrive straight in your
								inbox,
								<strong>
									{" "}
									here’s how to mark{" "}
									<a href="mailto:insight@auroraer.com">insight@auroraer.com</a> as a
									safe sender.
								</strong>
							</p>
							<p className="">
								Select your mailbox from the list below and follow the instructions:
							</p>
							<ul>
								<li>
									<a href="#outlook">Outlook</a>
								</li>
								<li>
									<a href="#Outlook-mobile-app">Outlook mobile app</a>
								</li>
								<li>
									<a href="#Gmail">Gmail</a>
								</li>
								<li>
									<a href="#Gmail-mobile-app">Gmail mobile app</a>
								</li>
								<li>
									<a href="#Yahoo-mail">Yahoo mail</a>
								</li>
								<li>
									<a href="#Yahoo-mail-mobile-app">Yahoo mail mobile app</a>
								</li>
							</ul>
							<p>&nbsp;</p>
							<h4 id="Outlook">
								<b>Outlook</b>
							</h4>
							<ol>
								<li>
									On the Home tab in Outlook, click the 3 dots in the top right and then
									Junk -&gt; Junk E-Mail Options
								</li>
								<li>Click Safe Senders -&gt; Add…</li>
								<li>
									Enter <a href="mailto:Insight@auroraer.com">Insight@auroraer.com</a>
								</li>
							</ol>
							<p>&nbsp;</p>
							<h4 id="Outlook-mobile-app">
								<b>Outlook mobile app</b>
							</h4>
							<ol>
								<li>Open Outlook Mobile App</li>
								<li>Click on the message that you want to whitelist</li>
								<li>Click on the three dots in the top right corner</li>
								<li>Click “Move to focused inbox”</li>
								<li>
									When the pop-up screen comes up, click “Move this and all future
									messages”
								</li>
							</ol>
							<p>&nbsp;</p>
							<h4 id="Gmail">
								<b>Gmail</b>
							</h4>
							<ol>
								<li>
									Click the settings button (in the top-right corner of the screen), then
									select “Settings” from the drop-down menu
								</li>
								<li>Select “Filtered and Blocked Addresses”</li>
								<li>Select “Create a new filter” and enter Insight@auroraer.com</li>
								<li>Click “Create filter” and mark “Never send to Spam”</li>
							</ol>
							<p>&nbsp;</p>
							<h4 id="Gmail-mobile-app">
								<b>Gmail mobile app</b>
							</h4>
							<ol>
								<li>Open the Gmail application</li>
								<li>Navigate to Spam or Junk Folder</li>
								<li>Click on the message you wish to view</li>
								<li>Select the option “Report not spam”</li>
								<li>You will now receive messages from this sender as normal</li>
							</ol>
							<p>&nbsp;</p>
							<h4>
								<b>Yahoo mail</b>
							</h4>
							<ol>
								<li>
									Highlight an Aurora email in the Bulk folder and mark it as Not Spam
								</li>
							</ol>
							<p>&nbsp;</p>
							<h4 id="Yahoo-mail-mobile-app">
								<b>Yahoo mail mobile app</b>
							</h4>
							<ol>
								<li>Open Yahoo Mail Mobile App</li>
								<li>Click on the sidebar</li>
								<li>Click on the Spam folder</li>
								<li>Find the email you wish to whitelist</li>
								<li>Click “Move” and then click “Inbox”</li>
							</ol>
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
