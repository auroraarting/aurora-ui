// Force this route to run fresh on every request — no Next.js route cache,
// no Data Cache for its fetch() calls.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { draftMode } from "next/headers";

/** Draft */
export async function GET(request) {
	const draft = await draftMode();
	draft.disable();
	return new Response("Draft mode is disable");
}
