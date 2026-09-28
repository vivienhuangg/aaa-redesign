"use client";

import { Check, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MEMBERSHIP_FORM = "https://forms.gle/FZeehoTE2WP3o5yR9";

export default function ContactPage() {
	return (
		<div className="bg-background pt-[4.25rem]">
			<section className="py-16">
				<div className="container mx-auto px-4 sm:px-6">
					<Card className="mx-auto mb-10 max-w-4xl border-border bg-card">
						<CardHeader className="text-center">
							<CardTitle className="text-3xl sm:text-4xl">
								General membership
							</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col items-center gap-8">
							<ul className="w-full max-w-2xl space-y-4">
								{[
									"Free entrance to all future AAA study breaks🍵🐾",
									"A discounted ticket to our Nightmarket event in November🍚",
									"Access to external collaboration events with other clubs",
									"Finals care packages 🍪🥐🍰",
								].map((perk) => (
									<li key={perk} className="flex items-start gap-3">
										<Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
										<p className="text-lg leading-snug text-foreground">
											{perk}
										</p>
									</li>
								))}
							</ul>
							<Button
								asChild
								className="h-14 rounded-full bg-accent px-10 text-lg font-semibold text-accent-foreground hover:bg-accent/90"
							>
								<Link
									href={MEMBERSHIP_FORM}
									target="_blank"
									rel="noopener noreferrer"
								>
									Sign up for general membership
								</Link>
							</Button>
						</CardContent>
					</Card>

					<div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
						<Card className="border-border bg-card">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-2xl">
									<Mail className="h-5 w-5 text-accent" />
									Mailing list
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Button
									asChild
									variant="outline"
									className="rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
								>
									<Link
										href="https://mailman.mit.edu/mailman/listinfo/aaa-announce"
										target="_blank"
										rel="noopener noreferrer"
									>
										Join aaa-announce
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card className="border-border bg-card">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-2xl">
									<Instagram className="h-5 w-5 text-accent" />
									Instagram
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Button
									asChild
									variant="outline"
									className="rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
								>
									<Link
										href="http://instagram.com/asiansatmit/"
										target="_blank"
										rel="noopener noreferrer"
									>
										@asiansatmit
									</Link>
								</Button>
							</CardContent>
						</Card>
					</div>

					<Card className="mx-auto mt-5 max-w-4xl border-border bg-card">
						<CardHeader className="text-center">
							<CardTitle className="text-2xl">Questions?</CardTitle>
						</CardHeader>
						<CardContent className="text-center">
							<p className="mb-4 text-muted-foreground">
								Reach out with any questions at
							</p>
							<Link
								href="mailto:aaa-exec@mit.edu"
								className="text-lg font-semibold text-accent hover:underline"
							>
								aaa-exec@mit.edu
							</Link>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
