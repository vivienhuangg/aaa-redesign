"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSending, setIsSending] = useState(false);
	const [sent, setSent] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsSending(true);
		setSent(false);

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (res.ok) {
				setSent(true);
				setFormData({ name: "", email: "", subject: "", message: "" });
			} else {
				alert(
					"Sorry, there was a problem sending your message. Please try again later.",
				);
			}

			setIsSending(false);
		} catch (err) {
			console.error("Contact form error:", err);
			alert(
				"Sorry, there was a problem sending your message. Please try again later.",
			);
			setIsSending(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-warm-white via-soft-cream to-warm-gray-100">
			{/* Header */}
			<NavBar></NavBar>

			{/* Contact Section */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-5xl font-bold text-warm-gray-800 mb-4">
							Contact & Join Us
						</h2>
						<p className="text-xl text-warm-gray-700 max-w-3xl mx-auto">
							Join the fAAAm!
						</p>
					</div>

					<div className="flex gap-12">
						<div className="w-1/2 flex flex-col gap-4">
							<Card className=" bg-warm-white/90 border-accent ">
								<CardHeader className="flex flex-col items-center">
									<CardTitle className="text-2xl text-center">
										Join the Mailing List
									</CardTitle>
									<p className="text-warm-gray-600 text-center">
										Stay updated on all our events and announcements!
									</p>
								</CardHeader>
								<CardContent className="flex flex-col items-center">
									<Link
										className="rounded-lg p-2 px-4 bg-accent hover:bg-accent/90 text-accent-foreground"
										href="https://mailman.mit.edu/mailman/listinfo/aaa-announce"
									>
										mailman.mit.edu
									</Link>
								</CardContent>
							</Card>
							{/* Social Media Links */}
							<Card className=" bg-warm-white/90 border-accent ">
								<CardHeader className="flex flex-col items-center">
									<CardTitle className=" text-2xl text-center">
										Follow Us on Social Media
									</CardTitle>
								</CardHeader>
								<CardContent className="flex flex-row items-center">
									<Link
										className="rounded-lg p-2 hover:text-accent flex flex-row items-center gap-2"
										href="http://instagram.com/asiansatmit/"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Instagram className="w-8 h-8" />
										<p className="text-warm-gray-600 text-center">
											@asiansatmit
										</p>
									</Link>
								</CardContent>
							</Card>
						</div>
						{/* Mailing List Form */}

						{/* Get in Touch Form */}
						<Card className="bg-warm-white/90 border-accent">
							<CardHeader className="flex flex-col items-center">
								<CardTitle className="text-warm-gray-800 text-2xl text-center">
									Get in Touch
								</CardTitle>
								<p className="text-warm-gray-600 text-center">
									Have questions about what we do? Interested in sponsoring?
									We'd love to hear from you!
								</p>
							</CardHeader>
							<CardContent className="flex flex-col items-center">
								<form
									onSubmit={handleSubmit}
									className="space-y-4 flex flex-col items-center w-full"
								>
									<Input
										type="text"
										placeholder="Your name"
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										required
										className="bg-warm-gray-50 border-warm-gray-200 text-warm-gray-800 placeholder:text-warm-gray-500"
									/>
									<Input
										type="text"
										placeholder="Subject"
										value={formData.subject}
										onChange={(e) =>
											setFormData({ ...formData, subject: e.target.value })
										}
										required
										className="bg-warm-gray-50 border-warm-gray-200 text-warm-gray-800 placeholder:text-warm-gray-500"
									/>
									<Input
										type="email"
										placeholder="Your email"
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										required
										className="bg-warm-gray-50 border-warm-gray-200 text-warm-gray-800 placeholder:text-warm-gray-500"
									/>
									<Textarea
										placeholder="Your message"
										value={formData.message}
										onChange={(e) =>
											setFormData({ ...formData, message: e.target.value })
										}
										required
										rows={4}
										className="bg-warm-gray-50 border-warm-gray-200 text-warm-gray-800 placeholder:text-warm-gray-500"
									/>

									<Button
										type="submit"
										disabled={isSending}
										className="px-4 py-2 text-center bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
									>
										{isSending ? "Sending…" : sent ? "Sent!" : "Send Message"}
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}
