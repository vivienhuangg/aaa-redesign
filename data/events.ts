export interface CalendarEvent {
	id: string;
	title?: string;
	event_name?: string;
	date: string;
	start_time?: string;
	end_time?: string;
	location?: string;
	description?: string;
	type:
		| "study-break"
		| "major-event"
		| "cultural"
		| "social"
		| "election"
		| "workshop";
	attendees?: number;
	link?: string;
	link_display?: string;
}

export function getEventStart(event: Pick<CalendarEvent, "date" | "start_time">) {
	// Keep date-only events visible in "upcoming" lists until their day ends.
	return new Date(`${event.date}T${event.start_time ?? "23:59"}:00`);
}

export function formatEventDate(date: string) {
	return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function formatClockTime(time: string) {
	return new Date(`2000-01-01T${time}:00`).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}

export function formatEventTime(event: Pick<CalendarEvent, "start_time" | "end_time">) {
	if (!event.start_time) return null;

	const start = formatClockTime(event.start_time);
	return event.end_time ? `${start} – ${formatClockTime(event.end_time)}` : start;
}

export const eventTypeColors = {
	"study-break": "bg-pastel-blue text-blue-900",
	"major-event": "bg-pastel-red text-red-900",
	cultural: "bg-pastel-yellow text-yellow-900",
	social: "bg-pastel-green text-green-900",
	election: "bg-pastel-purple text-purple-900",
	workshop: "bg-pastel-orange text-orange-900",
};

export const eventTypeLabels = {
	"study-break": "Study Break",
	"major-event": "Major Event",
	cultural: "Cultural",
	social: "Social",
	election: "Election",
	workshop: "Workshop",
};
