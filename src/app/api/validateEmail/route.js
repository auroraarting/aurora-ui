// Force this route to run fresh on every request — no Next.js route cache,
// no Data Cache for its fetch() calls.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/* eslint-disable require-jsdoc */
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { validate } from "deep-email-validator";

export async function POST(req) {
	try {
		const { email } = await req.json();

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		const result = await validate(email);

		return NextResponse.json({
			valid: result.valid,
			reason: result.reason ?? null, // 'regex' | 'typo' | 'disposable' | 'mx' | 'smtp'
			validators: result.validators,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.message || "Validation failed." },
			{ status: 500 },
		);
	}
}
