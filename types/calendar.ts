export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  color?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  attendees?: string[];
}

export interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
  showWeekNumbers?: boolean;
  highlightToday?: boolean;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  firstDayOfWeek?: 0 | 1; // 0 = Sunday, 1 = Monday
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
  isNextMonth: boolean;
  events: CalendarEvent[];
  isToday: boolean;
  isDisabled: boolean;
}
