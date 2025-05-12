// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

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
