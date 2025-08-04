"use client";

import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/calendar";
import NavBar from "@/components/NavBar/NavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { eventTypeColors, eventTypeLabels } from "@/data/events";

export default function CalendarPage() {
	const [currentDate, setCurrentDate] = useState(new Date()); // Current date
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [view, setView] = useState("month");
	const [apiEvents, setApiEvents] = useState([]);

	const upcomingEvents = useMemo(() => {
		const now = new Date();
		return [...apiEvents]
			.filter((e) => new Date(e.start_time) > now)
			.sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
			.slice(0, 3);
	}, [apiEvents]);

	// Fetch events from API on component mount
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch("/api/events");
				if (response.ok) {
					const data = await response.json();
					// Map API events to calendar-friendly structure
					const mapped = data.map((e) => {
						const dateStr = new Date(e.start_time).toISOString().split("T")[0];
						const colorClasses =
							eventTypeColors[e.type] || "bg-accent text-accent-foreground";
						const [bgClass, textClass] = colorClasses.split(" ");
						const borderClass = bgClass.replace("bg-", "border-");
						return {
							...e,
							id: e.id ?? e.event_name,
							title: e.event_name,
							date: dateStr,
						};
					});
					setApiEvents(mapped);
				}
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};

		fetchEvents();
	}, []);

	return (
		<div className="min-h-screen bg-background py-20 relative overflow-hidden">
			{/* Header */}
			<NavBar />
			<div className=" mx-auto px-4bg-background">
				{/* Calendar Section */}
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="md:text-5xl text-3xl font-bold text-primary mb-4">
							c<span className="text-accent">AAA</span>lendar
						</h2>
					</div>

					<div className="flex md:flex-row flex-col w-full gap-6">
						{/* Calendar on the left */}
						<div className="w-full md:w-2/3">
							<div className="w-full h-full">
								<Calendar
									events={apiEvents}
									onDateClick={(date) => {
										const dateKey = new Date(date).toISOString().split("T")[0];
										const hasEvents = apiEvents.some((e) => e.date === dateKey);
										if (!hasEvents) {
											setSelectedEvent(null);
										}
									}}
									onEventClick={(event) => setSelectedEvent(event)}
									highlightToday={true}
								/>
							</div>
						</div>

						{/* Event Details Sidebar on the right */}
						<div className="w-full md:w-1/3">
							<div className="w-full h-full">
								{/* Sidebar Content */}
								{selectedEvent ? (
									<Card className="bg-white border-border backdrop-blur-sm">
										<CardHeader>
											<div className="flex items-start justify-between gap-2">
												<CardTitle className="text-primary text-xl flex-1 min-w-0">
													<span className="block truncate">
														{selectedEvent.event_name}
													</span>
												</CardTitle>
												<Badge
													variant="outline"
													className={`border-0 ${eventTypeColors[selectedEvent.type]} flex-shrink-0`}
												>
													{eventTypeLabels[selectedEvent.type]}
												</Badge>
											</div>
										</CardHeader>
										<CardContent className="space-y-4">
											<div className="space-y-3 text-muted-foreground">
												<div className="flex items-center gap-2 min-w-0">
													<CalendarIcon className="w-4 h-4 flex-shrink-0" />
													<span className="truncate">
														{new Date(
															selectedEvent.start_time,
														).toLocaleDateString("en-US", {
															weekday: "long",
															year: "numeric",
															month: "long",
															day: "numeric",
														})}
													</span>
												</div>
												<div className="flex items-center gap-2 min-w-0">
													<Clock className="w-4 h-4 flex-shrink-0" />
													<span className="truncate">
														{new Date(
															selectedEvent.start_time,
														).toLocaleTimeString("en-US", {
															hour: "numeric",
															minute: "2-digit",
															hour12: true,
														})}
													</span>
												</div>
												<div className="flex items-center gap-2 min-w-0">
													<MapPin className="w-4 h-4 flex-shrink-0" />
													<span className="truncate">
														{selectedEvent.location}
													</span>
												</div>
											</div>
											<p className="text-muted-foreground text-sm leading-relaxed break-words">
												{selectedEvent.description}
											</p>
											{selectedEvent.link && (
												<Link
													href={selectedEvent.link}
													target="_blank"
													rel="noopener noreferrer"
													className="w-full"
												>
													<Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
														{selectedEvent.link_display ?? "RSVP for Event"}
													</Button>
												</Link>
											)}
										</CardContent>
									</Card>
								) : (
									<div className="space-y-4">
										{upcomingEvents.length === 0 ? (
											<p className="text-muted-foreground text-sm">
												No upcoming events.
											</p>
										) : (
											upcomingEvents.map((e) => (
												<Card
													key={e.id ?? e.event_name}
													className="bg-white border-border backdrop-blur-sm"
												>
													<CardHeader>
														<div className="flex items-start justify-between gap-2 overflow-hidden">
															<CardTitle className="text-primary text-xl flex-1 min-w-0">
																<span className="block truncate">
																	{e.event_name}
																</span>
															</CardTitle>
															<Badge
																variant="outline"
																className={`border-0 ${eventTypeColors[e.type]} flex-shrink-0`}
															>
																{eventTypeLabels[e.type]}
															</Badge>
														</div>
													</CardHeader>
													<CardContent className="space-y-4">
														<div className="space-y-3 text-muted-foreground">
															<div className="flex items-center gap-2 min-w-0">
																<CalendarIcon className="w-4 h-4 flex-shrink-0" />
																<span className="truncate">
																	{new Date(e.start_time).toLocaleDateString(
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
																	{new Date(e.start_time).toLocaleTimeString(
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
																<span className="truncate">{e.location}</span>
															</div>
														</div>
														<p className="text-muted-foreground text-sm leading-relaxed break-words">
															{e.description}
														</p>
														{e.link && (
															<Link
																href={e.link}
																target="_blank"
																rel="noopener noreferrer"
																className="w-full"
															>
																<Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
																	{e.link_display ?? "RSVP for Event"}
																</Button>
															</Link>
														)}
													</CardContent>
												</Card>
											))
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
