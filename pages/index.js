// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";

// SECTIONS //
import HomeResources from "@/sections/home/HomeResources";
import HomeEvents from "@/sections/home/HomeEvents";
import HomeTalentMeets from "@/sections/home/HomeTalentMeets";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/Home.module.scss";

// IMAGES //

// DATA //

/** Home Page */
export default function HomePage() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Home"} Desc={"Home Desc"} OgImg={""} Url={"/"} />

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={`${styles.HomePage}`}>
				<div className="pb_100">
					<HomeResources />
				</div>
				<div className="pb_100">
					<HomeEvents />
				</div>
				<div className="">
					<HomeTalentMeets />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
