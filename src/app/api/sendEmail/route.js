/* eslint-disable require-jsdoc */
import { EmailTemplate } from "@/components/email/EmailTemplate.jsx";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
	try {
		// const { name, email } = JSON.parse(req.body);
		const name = "developer name";
		const email = "developer email";

		const data = await resend.emails.send({
			from: "Ting Base Template <onboarding@resend.dev>",
			to: "developer@ting.in",
			subject: "New submission to your contact form!",
			// html: "<h1>hello</h1>",
			react: EmailTemplate({ name, email }),
		});

		res.status(200).json(data);
	} catch (error) {
		res.status(400).json(error);
	}
}
