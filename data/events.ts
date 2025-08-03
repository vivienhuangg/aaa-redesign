export interface CalendarEvent {
	id: string;
	title: string;
	date: string;
	time: string;
	location: string;
	description: string;
	type:
		| "study-break"
		| "major-event"
		| "cultural"
		| "social"
		| "election"
		| "workshop";
	attendees?: number;
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
