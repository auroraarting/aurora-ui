import { draftMode } from "next/headers";

/** Draft */
export async function GET(request) {
	const draft = await draftMode();
	draft.enable();
	return new Response("Draft mode is enabled");
}
