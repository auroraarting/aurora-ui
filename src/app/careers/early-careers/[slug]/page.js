export const dynamic = "force-static";

// COMPONENTS //
import { notFound } from "next/navigation";

// SECTIONS //
import EarlyProgramme from "@/sections/careers/EarlyProgramme";

// SERVICES //
import { getProgrammeBySlug, getProgrammeList } from "@/services/EarlyCareers.service";

// DATA //
import { toProgrammeData } from "@/data/earlyCareersProgrammes";

/** The CMS programme for a route slug, or null. @param {string} slug */
async function fetchProgramme(slug) {
	const res = await getProgrammeBySlug(slug);
	return res?.data?.programme || null;
}

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const { slug } = await params;
	const node = await fetchProgramme(slug);
	const data = node ? toProgrammeData(node) : null;
	const seo = node?.seo;

	return {
		title: seo?.title || (data ? `${data.title} | Aurora Energy Research` : "Early Careers"),
		description:
			seo?.metaDesc ||
			String(data?.programmes?.header?.intro || "").replace(/<[^>]*>/g, "").trim(),
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: `https://auroraer.com/careers/early-careers/${slug}`,
		},
		openGraph: {
			images: [{ url: "https://auroraer.com/img/og-image.jpg" }],
		},
	};
}

/** generateStaticParams — every published programme. A programme published
 *  after the build renders on its first request (dynamicParams stays on). */
export async function generateStaticParams() {
	const res = await getProgrammeList();
	return (res?.data?.programmes?.nodes || []).map((item) => ({ slug: item.slug }));
}

/** Early careers programme page (redesign) */
export default async function EarlyCareersProgramme({ params }) {
	const { slug } = await params;
	const node = await fetchProgramme(slug);

	if (!node) {
		notFound();
	}

	return <EarlyProgramme data={toProgrammeData(node)} />;
}
