"use client";

import { CalendarIcon, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroImage from "@/components/HomePage/HeroImage";
import NavBar from "@/components/NavBar/NavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { eventTypeColors, eventTypeLabels } from "@/data/events";

export default function HomePage() {
	const [allEvents, setAllEvents] = useState([]);

	// Load events from API on component mount
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch("/api/events");
				if (response.ok) {
					const data = await response.json();
					setAllEvents(data);
				}
			} catch (error) {
				console.error("Error loading events:", error);
			}
		};

		fetchEvents();
	}, []);

	const upcomingEvents = allEvents
		.filter((event) => new Date(event.start_time) >= new Date())
		.sort(
			(a, b) =>
				new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
		)
		.slice(0, 4);

	return (
		<div className="min-h-screen bg-background relative">
			{/* NavBar overlaying hero image, scrolls away with page */}
			<NavBar />

			<HeroImage />

			<div className="flex flex-col gap-16 mx-auto p-12 px-36">
				{/* Quick welcome and tidbit about AAA */}
				<div className="mx-auto px-4 gap-4 flex flex-col items-center">
					<h2 className="text-4xl font-bold text-center text-accent">
						Welcome to AAA!
					</h2>
					<div className="font-bold text-center text-xl text-foreground leading-relaxed">
						We are MIT's Asian American Association (AAA)! From our events like
						Nightmarket, Grains of Rice spring banquet, and study breaks to bake
						sales and fundraisers, we work to celebrate Asian culture amongst
						the MIT community and beyond. Whether you hope to become a part of
						our executive board or general member, we hope to have you join our
						f<span className="text-accent">AAA</span>m! ◡̈
					</div>
				</div>

				{/* Calendar Section */}
				<div className=" mx-auto w-full px-4">
					<Card className="w-full mx-auto">
						<CardHeader>
							<CardTitle className="text-4xl font-bold text-center">
								Upcoming Events
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-2 gap-4">
								{upcomingEvents.length > 0 ? (
									upcomingEvents.map((event) => (
										<Card
											key={event.id ?? event.event_name}
											className="bg-white border-border backdrop-blur-sm"
										>
											<CardHeader>
												<div className="flex items-start justify-between gap-2">
													<CardTitle className="text-primary text-xl flex-1 min-w-0">
														<span className="block truncate">
															{event.event_name}
														</span>
													</CardTitle>
													<Badge
														variant="outline"
														className={`border-0 ${eventTypeColors[event.type]} flex-shrink-0`}
													>
														{eventTypeLabels[event.type]}
													</Badge>
												</div>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="space-y-3 text-muted-foreground">
													<div className="flex items-center gap-2 min-w-0">
														<CalendarIcon className="w-4 h-4 flex-shrink-0" />
														<span className="truncate">
															{new Date(event.start_time).toLocaleDateString(
																"en-US",
																{
																	weekday: "long",
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																},
															)}
														</span>
													</div>
													<div className="flex items-center gap-2 min-w-0">
														<Clock className="w-4 h-4 flex-shrink-0" />
														<span className="truncate">
															{new Date(event.start_time).toLocaleTimeString(
																"en-US",
																{
																	hour: "numeric",
																	minute: "2-digit",
																	hour12: true,
																},
															)}
														</span>
													</div>
													<div className="flex items-center gap-2 min-w-0">
														<MapPin className="w-4 h-4 flex-shrink-0" />
														<span className="truncate">{event.location}</span>
													</div>
												</div>
												<p className="text-muted-foreground text-sm leading-relaxed break-words">
													{event.description}
												</p>
												{event.link && (
													<Link
														href={event.link}
														target="_blank"
														rel="noopener noreferrer"
														className="w-full"
													>
														<Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
															{event.link_display ?? "RSVP for Event"}
														</Button>
													</Link>
												)}
											</CardContent>
										</Card>
									))
								) : (
									<div className="col-span-2 text-center py-8">
										<p className="text-muted-foreground">
											No upcoming events scheduled.
										</p>
										<p className="text-muted-foreground text-sm mt-2">
											Check back soon for new events!
										</p>
									</div>
								)}
							</div>
							<div className="text-center mt-8">
								<Link href="/calendar">
									<Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3">
										View Full Calendar
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
