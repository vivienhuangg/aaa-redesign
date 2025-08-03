"use client";

import {
	AlertCircle,
	CalendarIcon,
	Check,
	Loader2,
	Save,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";
import { eventTypeColors, eventTypeLabels } from "@/data/events";

// Sample JSON shown in the helper card
const sampleEventsJSON = `[
  {
    "event_name": "Frep Elections",
    "start_time": "2025-09-11T19:00:00Z",
    "end_time": "2025-09-11T21:00:00Z",
    "location": "BC Porter Room",
    "description": "Join us for snacks, games, and good vibes!",
    "type": "election",
    "link": "https://forms.gle/1234567890",
    "link_display": "Submit your platform!"
  }
]`;

export default function AdminPanel() {
	const [events, setEvents] = useState([]);
	const [loadingEvents, setLoadingEvents] = useState(false);
	const [jsonInput, setJsonInput] = useState("");
	const [toast, setToast] = useState(null);

	/**
	 * Helper ────────────────────────────────────────────────────────────────────
	 */
	const isoToLocalInputValue = (iso) => {
		try {
			if (!iso) return "";
			const date = new Date(iso);
			// toISOString gives Z, slice to get YYYY-MM-DDTHH:MM
			return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
				.toISOString()
				.slice(0, 16);
		} catch {
			return "";
		}
	};

	/**
	 * Fetch all events on mount
	 */
	useEffect(() => {
		const fetchEvents = async () => {
			setLoadingEvents(true);
			try {
				const res = await fetch("/api/events");
				if (!res.ok) throw new Error("Failed to load events");
				const data = await res.json();
				setEvents(data);
			} catch (err) {
				console.error(err);
				setToast({ message: err.message, type: "error" });
			} finally {
				setLoadingEvents(false);
			}
		};

		fetchEvents();
	}, []);

	/**
	 * JSON upload section logic ────────────────────────────────────────────────
	 */
	const parseEvents = (jsonString) => {
		try {
			const parsed = JSON.parse(jsonString);
			return Array.isArray(parsed) ? parsed : [parsed];
		} catch {
			return null;
		}
	};

	const handleSubmitEvent = async () => {
		if (!jsonInput.trim()) {
			setToast({ message: "Please enter JSON data", type: "error" });
			return;
		}

		const parsedEvents = parseEvents(jsonInput);
		if (!parsedEvents) {
			setToast({ message: "Invalid JSON format", type: "error" });
			return;
		}

		try {
			const res = await fetch("/api/events", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(parsedEvents),
			});

			if (!res.ok) throw new Error("Failed to create events");
			const created = await res.json();
			setEvents((prev) => [...prev, ...created]);
			setToast({ message: "Events submitted successfully!", type: "success" });
			setJsonInput("");
		} catch (err) {
			setToast({ message: err.message, type: "error" });
		}
	};

	/**
	 * Editing existing events ──────────────────────────────────────────────────
	 */
	const handleFieldChange = (idx, field, value) => {
		setEvents((prev) => {
			const updated = [...prev];
			updated[idx] = { ...updated[idx], [field]: value };
			return updated;
		});
	};

	const saveEvent = async (event) => {
		try {
			const res = await fetch(`/api/events/${event.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(event),
			});
			if (!res.ok) throw new Error("Failed to update event");
			const updated = await res.json();
			setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
			setToast({ message: "Event saved", type: "success" });
		} catch (err) {
			setToast({ message: err.message, type: "error" });
		}
	};

	const deleteEvent = async (id) => {
		if (!confirm("Are you sure you want to delete this event?")) return;
		try {
			const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
			if (!res.ok) throw new Error("Failed to delete event");
			setEvents((prev) => prev.filter((e) => e.id !== id));
			setToast({ message: "Event deleted", type: "success" });
		} catch (err) {
			setToast({ message: err.message, type: "error" });
		}
	};

	/**
	 * Render ───────────────────────────────────────────────────────────────────
	 */
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			{/* Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<Link
							href="/"
							className="text-gray-900 hover:text-blue-600 transition-colors"
						>
							<div>
								<h1 className="text-2xl font-bold">MIT AAA</h1>
								<p className="text-sm text-gray-600">Admin Panel</p>
							</div>
						</Link>
						<nav className="flex space-x-6">
							<Link
								href="/"
								className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
							>
								Back to Website
							</Link>
							<Link
								href="/calendar"
								className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
							>
								View Calendar
							</Link>
						</nav>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-2 sm:px-4 py-8 max-w-7xl overflow-hidden">
				<div className="text-center mb-8">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Event Management
					</h2>
					<p className="text-lg text-gray-600">
						Upload and manage events for the AAA calendar
					</p>
				</div>

				{/* Upload / helper section */}
				<div className="grid lg:grid-cols-2 gap-6 lg:gap-8 w-full mb-12">
					<Card className="w-full max-w-full">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CalendarIcon className="w-5 h-5" /> JSON Event Data
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<Textarea
								placeholder="Paste your JSON event data here..."
								value={jsonInput}
								onChange={(e) => setJsonInput(e.target.value)}
								rows={12}
								className="font-mono text-sm"
							/>
							<div className="flex gap-2">
								<Button
									onClick={handleSubmitEvent}
									className="bg-green-600 hover:bg-green-700"
									disabled={!jsonInput.trim()}
								>
									<Check className="w-4 h-4 mr-2" /> Submit Event
								</Button>
							</div>
						</CardContent>
					</Card>
					<div className="flex flex-col gap-4">
						{/* Event Types */}
						<Card className="w-full max-w-full">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									Event Types
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-2">
									{Object.entries(eventTypeLabels).map(([type, label]) => (
										<Badge
											key={type}
											className={`${eventTypeColors[type]} justify-center`}
										>
											{label}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
						{/* JSON Sample Guide */}
						<Card className="w-full max-w-full">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<AlertCircle className="w-5 h-5" /> JSON Sample Text
								</CardTitle>
							</CardHeader>
							<CardContent>
								<pre className="bg-gray-100 p-2 lg:p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-words text-xs w-full max-w-full">
									{sampleEventsJSON}
								</pre>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Editable event cards */}
				<div className="space-y-6">
					{loadingEvents ? (
						<div className="flex justify-center py-12">
							<Loader2 className="w-6 h-6 animate-spin text-gray-600" />
						</div>
					) : events.length === 0 ? (
						<p className="text-center text-gray-500">No events found.</p>
					) : (
						events.map((event, idx) => (
							<Card key={event.id || idx} className="w-full bg-white">
								<CardHeader>
									<CardTitle>
										<Input
											className="font-semibold text-lg"
											value={event.event_name || ""}
											onChange={(e) =>
												handleFieldChange(idx, "event_name", e.target.value)
											}
											placeholder="Event name"
										/>
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<label className="text-xs font-medium text-gray-600">
												Start Time
											</label>
											<Input
												type="datetime-local"
												value={isoToLocalInputValue(event.start_time)}
												onChange={(e) =>
													handleFieldChange(
														idx,
														"start_time",
														new Date(e.target.value).toISOString(),
													)
												}
											/>
										</div>
										<div className="space-y-2">
											<label className="text-xs font-medium text-gray-600">
												End Time
											</label>
											<Input
												type="datetime-local"
												value={isoToLocalInputValue(event.end_time)}
												onChange={(e) =>
													handleFieldChange(
														idx,
														"end_time",
														new Date(e.target.value).toISOString(),
													)
												}
											/>
										</div>
										<div className="space-y-2">
											<label className="text-xs font-medium text-gray-600">
												Location
											</label>
											<Input
												value={event.location || ""}
												onChange={(e) =>
													handleFieldChange(idx, "location", e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<label className="text-xs font-medium text-gray-600">
												Type
											</label>
											<Input
												value={event.type || ""}
												onChange={(e) =>
													handleFieldChange(idx, "type", e.target.value)
												}
											/>
										</div>
										<div className="md:col-span-2 space-y-2">
											<label className="text-xs font-medium text-gray-600">
												Link
											</label>
											<Input
												value={event.link || ""}
												onChange={(e) =>
													handleFieldChange(idx, "link", e.target.value)
												}
											/>
										</div>
										<div className="md:col-span-2 space-y-2">
											<label className="text-xs font-medium text-gray-600">
												Link
											</label>
											<Input
												value={event.link_display || ""}
												onChange={(e) =>
													handleFieldChange(idx, "link_display", e.target.value)
												}
											/>
										</div>
										<div className="md:col-span-2 space-y-2">
											<label className="text-xs font-medium text-gray-600">
												Description
											</label>
											<Textarea
												rows={3}
												value={event.description || ""}
												onChange={(e) =>
													handleFieldChange(idx, "description", e.target.value)
												}
											/>
										</div>
									</div>
									<div className="flex gap-3 pt-2">
										<Button
											size="sm"
											className="bg-blue-600 hover:bg-blue-700 text-white "
											onClick={() => saveEvent(event)}
										>
											<Save className="w-4 h-4 mr-1" /> Save
										</Button>
										<Button
											size="sm"
											variant="destructive"
											onClick={() => deleteEvent(event.id)}
										>
											<Trash2 className="w-4 h-4 mr-1" /> Delete
										</Button>
									</div>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</div>

			{/* Toast Notification */}
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(null)}
				/>
			)}
		</div>
	);
}
