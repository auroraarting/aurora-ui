/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import TeamWrap from "@/sections/company/team/TeamWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SECTORS //
import { getTeamSectors } from "@/services/Teams.service";

// SERVICES //
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "team", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/company/team", // 👈 canonical URL
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

export const revalidate = 30; // Revalidates every 60 seconds

/** Fetch */
async function getData() {
	const [data] = await Promise.all([await getTeamSectors()]);
	const countries = data.data.countries.nodes;
	let teams = [];
	let ceo = [];
	data.data.teams.nodes?.map((item) => {
		if (item?.title.toLowerCase().includes("feddersen")) {
			ceo.push(item);
		} else {
			teams.push(item);
		}
	});

	return {
		props: {
			data: [...ceo, ...teams],
			countries,
		},
	};
}

/** Team Page */
export default async function Team() {
	const { props } = await getData();
	const { data, countries } = props;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Team"} Desc={""} OgImg={""} Url={"/team"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<TeamWrap data={data} countries={countries} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
