import { type NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 * Body: { name: string; email: string; subject: string; message: string }
 * Sends an email to aaa-exec@mit.edu via SMTP2GO HTTPS API.
 *
 * Env vars required in .env.local:
 *  SMTP2GO_KEY   – your SMTP2GO API key (starts with "api-")
 *  SMTP2GO_SENDER – a verified sender address (e.g. aaa-exec@mit.edu)
 */
export async function POST(req: NextRequest) {
	try {
		const { name, email, subject, message } = await req.json();

		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Build SMTP2GO payload (docs: https://developers.smtp2go.com/docs/send-an-email)
		const payload = {
			sender: process.env.SMTP2GO_SENDER,
			to: ["aaa-exec@mit.edu"],
			subject: `AAA Website Contact Form - ${subject}`,
			text_body: `Name: ${name}\nEmail: ${email}\n\n${message}`,
			reply_to: [`\"${name}\" <${email}>`],
		};

		const smtpRes = await fetch("https://api.smtp2go.com/v3/email/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Smtp2go-Api-Key": process.env.SMTP2GO_KEY ?? "",
			},
			body: JSON.stringify(payload),
		});

		if (!smtpRes.ok) {
			const err = await smtpRes.json().catch(() => ({}));
			console.error("SMTP2GO error", err);
			return NextResponse.json({ error: "Email send failed" }, { status: 500 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("/api/contact error", error);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
