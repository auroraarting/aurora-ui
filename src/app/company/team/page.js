/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
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
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "team", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		openGraph: {
			images: [
				{
					url: "https://www-staging.auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

/** Fetch */
async function getData() {
	const [data] = await Promise.all([getTeamSectors()]);
	const countries = data.data.countries.nodes;

	return {
		props: {
			data: data.data.teamsectors.nodes,
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
