export const runtime = "nodejs";

import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
// import ReactDOMServer from "react-dom/server";
import EmailTemplate from "@/components/email/EmailTemplate";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**  */
export async function POST(req) {
	try {
		const {
			name,
			email,
			subject,
			toOffice,
			lastname,
			company,
			jobtitle,
			phone,
			office,
			message,
		} = await req.json();

		if (!name || !email) {
			return NextResponse.json(
				{ error: "Missing name or email" },
				{ status: 400 }
			);
		}

		// Convert JSX to static HTML
		let htmlContent = `
		<div>
			<p>Thank You. Our team will get in touch to understand how we can support you. </p>
		</div>
		`;

		if (toOffice) {
			htmlContent = `
			<div>
				<p>A user has reached out with a query/accessibility request ahead of their upcoming office visit.</p>
				<p>Request you to please connect with them at the earliest and assist further.</p>

				<p>Details:</p>
				<p>Name: ${name} ${lastname}</p>
				<p>Email: ${email}</p>
				<p>Company: ${company}</p>
				<p>Job Title: ${jobtitle}</p>
				<p>Phone: ${phone}</p>
				<p>Office: ${office}</p>
				<p>Message: ${message}</p>			
			</div>
			`;
		}

		const msg = {
			to: email,
			from: "reception.noreply@auroraer.com", // Must be verified
			subject: subject || "Aurora Energy Research - Contact Us Query",
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
