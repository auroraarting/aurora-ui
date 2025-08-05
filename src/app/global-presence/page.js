/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import GlobalPresenceWrap from "@/sections/global-presence/GlobalPresenceWrap";

// PLUGINS //

// UTILS //
import { getMapJsonForAllRegions } from "@/utils";

// STYLES //
import styles from "@/styles/pages/global-presence/GlobalPresence.module.scss";

// IMAGES //
import slider_arrow from "/public/img/icons/slider_arrow.svg";

// DATA //

// SERVICES //
import {
	getGlobalPresencePage,
	getRegions,
} from "@/services/GlobalPresence.service";
import Link from "next/link";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "global-presence", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

// export const revalidate = 30; // Revalidates every 60 seconds

/** Fetch  */
async function getData() {
	// const regions = await getRegions();
	// const page = await getGlobalPresencePage();
	const [regions, page] = await Promise.all([
		await getRegions(),
		await getGlobalPresencePage(),
	]);

	const mapJson = getMapJsonForAllRegions(regions);

	const regionsArr = regions?.data?.regions?.nodes?.map((item) => {
		let obj = {};

		obj.title = item.name;
		if (item.countries?.nodes.length > 0) {
			obj.children = (
				<div className={`${styles.CountryWrapper}`}>
					<div className={`${styles.CountryBox}`}>
						{item.countries?.nodes?.map((item2) => {
							if (item2?.countries?.hideonglobalpresence) {
								return <></>;
							}
							return (
								<div className={`${styles.CountryItem}`} key={item2.slug}>
									<Link href={`/global-presence/${item2.slug}`}>
										<img
											src={
												item2?.featuredImage?.node?.mediaItemUrl ||
												item2?.countries?.bannerSection?.image?.node?.mediaItemUrl
											}
											className={`width_100 b_r_10 ${styles.image}`}
											alt={item2.title}
										/>
										<div className="f_j a_center pt_10">
											<h5 className="text_reg font_primary f_w_m color_secondary ">
												{item2.title}
											</h5>
											<span>
												<img
													src={slider_arrow.src}
													className={`${styles.icon}`}
													alt="arrow"
												/>
											</span>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			);
		}
		return obj;
	});

	return {
		props: { regions, page: page.data.page.globalPresence, mapJson, regionsArr },
	};
}

/** GlobalPresence Page */
export default async function GlobalPresence() {
	const { props } = await getData();
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Global Presence"}
				Desc={""}
				OgImg={""}
				Url={"/global-presence"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<GlobalPresenceWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
