import { redirect } from "next/navigation";

export const revalidate = 3600;

/** Redirect video slugs to videos listing */
export default function VideoSlug() {
	redirect("/resources/videos");
}
