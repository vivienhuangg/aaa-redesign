import { type NextRequest, NextResponse } from "next/server";
import type { SupabaseEvent } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";

// GET /api/events - Fetch all events
export async function GET() {
	try {
		const { data, error } = await supabase
			.from("events")
			.select("*")
			.order("start_time", { ascending: true });

		if (error) {
			console.error("Error fetching events:", error);
			return NextResponse.json(
				{ error: "Failed to fetch events" },
				{ status: 500 },
			);
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

// POST /api/events - Create new events
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const events = Array.isArray(body) ? body : [body];

		// Validate events
		for (const event of events) {
			if (!event.event_name || !event.start_time) {
				return NextResponse.json(
					{ error: "Event name and start time are required" },
					{ status: 400 },
				);
			}
		}

		const { data, error } = await supabase
			.from("events")
			.insert(events)
			.select();

		if (error) {
			console.error("Error creating events:", error);
			return NextResponse.json(
				{ error: "Failed to create events" },
				{ status: 500 },
			);
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
