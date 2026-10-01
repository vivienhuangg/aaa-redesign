"use client";

import { CalendarIcon, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Calendar } from "@/components/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import staticEvents from "@/data/calendar-events.json";
import {
	eventTypeColors,
	eventTypeLabels,
	formatEventDate,
	formatEventTime,
	getEventStart,
} from "@/data/events";

const events = staticEvents.map((event) => ({
	...event,
	title: event.event_name,
}));

export default function CalendarPage() {
	const [selectedEvent, setSelectedEvent] = useState(null);

	const upcomingEvents = useMemo(() => {
		const now = new Date();
		return [...events]
			.filter((event) => getEventStart(event) > now)
			.sort((a, b) => getEventStart(a) - getEventStart(b))
			.slice(0, 3);
	}, []);

	return (
		<div className="bg-background py-20 relative">
			<div className="mx-auto px-4 bg-background">
				{/* Calendar Section */}
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-5xl font-bold text-primary mb-4">
							c<span className="text-accent">AAA</span>lendar
						</h2>
					</div>

					<div className="flex flex-row w-full gap-6">
						{/* Calendar on the left */}
						<div className="w-2/3">
							<div className="w-full h-full">
								<Calendar
									events={events}
									onDateClick={(date) => {
										const dateKey = new Date(date).toISOString().split("T")[0];
										const hasEvents = events.some((e) => e.date === dateKey);
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
						<div className="w-1/3">
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
												{formatEventDate(selectedEvent.date)}
											</span>
										</div>
										{formatEventTime(selectedEvent) && (
											<div className="flex items-center gap-2 min-w-0">
												<Clock className="w-4 h-4 flex-shrink-0" />
												<span className="truncate">
													{formatEventTime(selectedEvent)}
												</span>
											</div>
										)}
										{selectedEvent.location && (
											<div className="flex items-center gap-2 min-w-0">
												<MapPin className="w-4 h-4 flex-shrink-0" />
												<span className="truncate">
													{selectedEvent.location}
												</span>
											</div>
										)}
									</div>
									{selectedEvent.description && (
										<p className="text-muted-foreground text-sm leading-relaxed break-words">
											{selectedEvent.description}
										</p>
									)}
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
														<div className="flex items-start justify-between gap-2">
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
														{formatEventDate(e.date)}
													</span>
												</div>
												{formatEventTime(e) && (
													<div className="flex items-center gap-2 min-w-0">
														<Clock className="w-4 h-4 flex-shrink-0" />
														<span className="truncate">{formatEventTime(e)}</span>
													</div>
												)}
												{e.location && (
													<div className="flex items-center gap-2 min-w-0">
														<MapPin className="w-4 h-4 flex-shrink-0" />
														<span className="truncate">{e.location}</span>
													</div>
												)}
											</div>
											{e.description && (
												<p className="text-muted-foreground text-sm leading-relaxed break-words">
													{e.description}
												</p>
											)}
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
