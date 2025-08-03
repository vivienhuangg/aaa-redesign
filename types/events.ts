export interface CalendarEvent {
	id: string;
	title: string;
	date: string; // YYYY-MM-DD format
	color?: string;
	description?: string;
	time?: string;
	location?: string;
	type?:
		| "study-break"
		| "major-event"
		| "cultural"
		| "social"
		| "election"
		| "workshop";
	attendees?: number;
}

export interface SupabaseEvent {
	id?: string;
	title: string;
	date: string;
	time?: string;
	location?: string;
	description?: string;
	type?:
		| "study-break"
		| "major-event"
		| "cultural"
		| "social"
		| "election"
		| "workshop";
	attendees?: number;
	created_at?: string;
}
