export const dynamic = "force-static";
export const dynamicParams = false; // Only the slugs in the data file exist.

// COMPONENTS //
import { notFound } from "next/navigation";

// SECTIONS //
import EarlyProgramme from "@/sections/careers/EarlyProgramme";

// DATA //
import { getProgrammeBySlug, programmes } from "@/data/earlyCareersProgrammes";

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const { slug } = await params;
	const data = getProgrammeBySlug(slug);

	return {
		title: data ? `${data.title} | Aurora Energy Research` : "Early Careers",
		description: data?.programmes?.header?.intro || "",
		alternates: {
			canonical: `https://auroraer.com/careers/early-careers/${slug}`,
		},
		openGraph: {
			images: [{ url: "https://auroraer.com/img/og-image.jpg" }],
		},
	};
}

/** generateStaticParams  */
export function generateStaticParams() {
	return programmes.map((item) => ({ slug: item.slug }));
}

/** Early careers programme page (redesign) */
export default async function EarlyCareersProgramme({ params }) {
	const { slug } = await params;
	const data = getProgrammeBySlug(slug);

	if (!data) {
		notFound();
	}

	return <EarlyProgramme data={data} />;
}
