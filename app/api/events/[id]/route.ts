import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// DELETE /api/events/[id] - Delete a specific event
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const { error } = await supabase.from("events").delete().eq("id", id);

		if (error) {
			console.error("Error deleting event:", error);
			return NextResponse.json(
				{ error: "Failed to delete event" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

// PUT /api/events/[id] - Update a specific event
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const body = await request.json();

		const { data, error } = await supabase
			.from("events")
			.update(body)
			.eq("id", id)
			.select()
			.single();

		if (error) {
			console.error("Error updating event:", error);
			return NextResponse.json(
				{ error: "Failed to update event" },
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
