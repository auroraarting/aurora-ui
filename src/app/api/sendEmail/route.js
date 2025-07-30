export const runtime = "nodejs";

import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
// import ReactDOMServer from "react-dom/server";
import EmailTemplate from "@/components/email/EmailTemplate";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**  */
export async function POST(req) {
	try {
		const { name, email } = await req.json();

		if (!name || !email) {
			return NextResponse.json(
				{ error: "Missing name or email" },
				{ status: 400 }
			);
		}

		// Convert JSX to static HTML
		const htmlContent = `
		<div>
			<p>Name: ${name} </p>
			<p>Email: ${email} </p>
		</div>
		`;

		const msg = {
			to: email,
			from: "nihal.padwal@ting.in", // Must be verified
			subject: "Welcome",
			html: htmlContent,
		};

		await sgMail.send(msg);

		return NextResponse.json(
			{ message: "Email sent successfully." },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.message || "Failed to send email." },
			{ status: 500 }
		);
	}
}
