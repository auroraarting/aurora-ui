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

	return {
		props: {
			data: data.data.teamsectors.nodes,
		},
	};
}

/** Team Page */
export default async function Team() {
	const { props } = await getData();
	const { data } = props;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Team"} Desc={""} OgImg={""} Url={"/team"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<TeamWrap data={data} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
