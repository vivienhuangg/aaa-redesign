"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export const CalendarProps = {
	events: [],
	onDateClick: (date) => {},
	onEventClick: (event) => {},
	className: "",
	showWeekNumbers: false,
	highlightToday: true,
	minDate: Date,
	maxDate: Date,
};

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function Calendar({
	events = [],
	onDateClick,
	onEventClick,
	className = "",
	showWeekNumbers = false,
	highlightToday = true,
	minDate,
	maxDate,
}) {
	const [currentDate, setCurrentDate] = useState(new Date());

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// Get calendar data for current month
	const calendarData = useMemo(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();

		// First day of the month
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);

		// Get the day of week for first day (0 = Sunday)
		const startingDayOfWeek = firstDay.getDay();

		// Calculate days to show from previous month
		const daysFromPrevMonth = startingDayOfWeek;
		const prevMonth = new Date(year, month - 1, 0);
		const prevMonthDays = [];

		for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
			const day = prevMonth.getDate() - i;
			prevMonthDays.push({
				date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day),
				isCurrentMonth: false,
				isPrevMonth: true,
				isNextMonth: false,
			});
		}

		// Days of current month
		const currentMonthDays = [];
		for (let day = 1; day <= lastDay.getDate(); day++) {
			currentMonthDays.push({
				date: new Date(year, month, day),
				isCurrentMonth: true,
				isPrevMonth: false,
				isNextMonth: false,
			});
		}

		// Days from next month to fill the grid
		const totalDays = prevMonthDays.length + currentMonthDays.length;
		const rows = Math.ceil(totalDays / 7);
		const totalCells = rows * 7;
		const remainingCells = totalCells - totalDays;
		const nextMonthDays = [];

		for (let day = 1; day <= remainingCells; day++) {
			nextMonthDays.push({
				date: new Date(year, month + 1, day),
				isCurrentMonth: false,
				isPrevMonth: false,
				isNextMonth: true,
			});
		}

		return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
	}, [currentDate]);

	// Group events by date
	const eventsByDate = useMemo(() => {
		const grouped = {};
		events.forEach((event) => {
			if (!grouped[event.date]) {
				grouped[event.date] = [];
			}
			grouped[event.date].push(event);
		});
		return grouped;
	}, [events]);

	// Navigation functions
	const goToPreviousMonth = () => {
		const newDate = new Date(currentDate);
		newDate.setMonth(currentDate.getMonth() - 1);
		if (!minDate || newDate >= minDate) {
			setCurrentDate(newDate);
		}
	};

	const goToNextMonth = () => {
		const newDate = new Date(currentDate);
		newDate.setMonth(currentDate.getMonth() + 1);
		if (!maxDate || newDate <= maxDate) {
			setCurrentDate(newDate);
		}
	};

	const goToToday = () => {
		setCurrentDate(new Date());
	};

	// Helper functions
	const formatDateKey = (date) => {
		return date.toISOString().split("T")[0];
	};

	const isToday = (date) => {
		return date.getTime() === today.getTime();
	};

	const isDisabled = (date) => {
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		return false;
	};

	const getWeekNumber = (date) => {
		const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
		const pastDaysOfYear =
			(date.getTime() - firstDayOfYear.getTime()) / 86400000;
		return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
	};

	return (
		<div className={`bg-card text-card-foreground rounded-xl border w-full`}>
			<div className="flex flex-row items-center justify-between px-6 py-4 gap-4">
				<div className="flex items-center gap-4">
					<h2 className="md:text-2xl font-semibold text-lg">
						{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
					</h2>
					<Button
						variant="outline"
						size="sm"
						onClick={goToToday}
						className="hidden text-sm bg-transparent hover:bg-accent"
					>
						Today
					</Button>
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={goToPreviousMonth}
						disabled={
							minDate &&
							new Date(currentDate.getFullYear(), currentDate.getMonth() - 1) <
								minDate
						}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={goToNextMonth}
						disabled={
							maxDate &&
							new Date(currentDate.getFullYear(), currentDate.getMonth() + 1) >
								maxDate
						}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="px-6 gap-4">
				{/* Weekday headers */}
				<div className="grid grid-cols-7 gap-0 w-full">
					{WEEKDAYS.map((day, idx) => (
						<div
							key={day}
							className={`
										text-accent-foreground bg-accent py-4 text-center text-sm font-semibold border
									${idx === 0 ? "border-l" : ""}
									${idx === 6 ? "border-r" : ""}
									`}
						>
							{day}
						</div>
					))}
				</div>

				{/* Calendar Grid */}
				<div className="gap-4 w-full mt-4 mb-4">
					<div
						className="gap-0 border border-border rounded-b-lg overflow-hidden auto-rows-[7rem]"
						style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}
					>
						{/* Calendar days */}
						{calendarData.map((dayData, index) => {
							const dateKey = formatDateKey(dayData.date);
							const dayEvents = eventsByDate[dateKey] || [];
							const isCurrentDay = isToday(dayData.date);
							const isDisabledDay = isDisabled(dayData.date);
							const isFirstColumn = index % 7 === 0;
							const isLastColumn = index % 7 === 6;

							return (
								<div
									key={index}
									className={`
										h-28 p-3 border-r border-t border-border
										${isFirstColumn ? "border-l" : ""}
										${isLastColumn ? "border-r" : ""}
										${!dayData.isCurrentMonth ? "bg-muted/50 text-muted-foreground" : "bg-background"}
										${isCurrentDay && highlightToday ? "bg-accent/10" : ""}
										${isDisabledDay ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/50"}
										transition-colors
									`}
									role="button"
									tabIndex={0}
									onClick={() => {
										if (!isDisabledDay && onDateClick) {
											onDateClick(dayData.date);
										}
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											if (!isDisabledDay && onDateClick) {
												onDateClick(dayData.date);
											}
										}
									}}
								>
									{/* Day number */}
									<div className="flex items-center justify-between">
										<span
											className={`
												text-base font-semibold
												${isCurrentDay && highlightToday ? "bg-accent text-accent-foreground rounded-full w-7 h-7 flex items-center justify-center shadow-sm" : ""}
              `}
										>
											{dayData.date.getDate()}
										</span>
									</div>

									{/* Events */}
									<div className="flex-1 flex flex-col justify-evenly overflow-hidden">
										{dayEvents.slice(0, 3).map((event) => (
											<div
												key={event.id}
												className="flex-1 md:text-xs text-2xs p-1 rounded font-medium
                   text-foreground hover:opacity-80 transition-opacity
                   overflow-hidden whitespace-normal break-words break-all truncate"
												title={event.description || event.title}
												onClick={(e) => {
													e.stopPropagation();
													onEventClick?.(event);
												}}
											>
												{event.title}
											</div>
										))}
										{dayEvents.length > 3 && (
											<div
												className="flex-1 text-xs p-1 font-medium
                      text-muted-foreground
                      overflow-hidden whitespace-nowrap truncate"
											>
												+{dayEvents.length - 3} more
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
