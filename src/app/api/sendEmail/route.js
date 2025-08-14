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
			customHTML,
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
		<p>Hi ${name},</p>
		</br>
		<p>Thank you for your message. Our reception team will get back to you shortly. </p>
		<p>If your query is commercial/business related, please speak to our experts. </p>
		<p>Visit our <a href="https://auroraer.com/global-presence" target="_blank" rel="noreferrer">Global Presence page</a> to connect with the desired regional team.</p>
		</br>
		<p>Thank you,</p>
		<p>Team Aurora Energy Research</p>
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

		if (customHTML) {
			htmlContent = customHTML;
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
