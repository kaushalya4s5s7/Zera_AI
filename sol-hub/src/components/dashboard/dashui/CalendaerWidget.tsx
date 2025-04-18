"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

// Mock events data
const events = [
  { id: 1, date: new Date(2025, 3, 15), title: "Smart Contract Audit" },
  { id: 2, date: new Date(2025, 3, 18), title: "Team Meeting" },
  { id: 3, date: new Date(2025, 3, 22), title: "Contract Deployment" },
  { id: 4, date: new Date(2025, 3, 25), title: "Security Review" },
];

type CalendarWidgetProps = {
  className?: string;
};

const CalendarWidget = ({ className }: CalendarWidgetProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { toast } = useToast();

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const getMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: "", events: [] });
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = events.filter(
        (event) =>
          event.date.getDate() === day &&
          event.date.getMonth() === month &&
          event.date.getFullYear() === year
      );

      days.push({ day, date, events: dayEvents });
    }

    return days;
  };

  const handleEventClick = (event: {
    id: number;
    date: Date;
    title: string;
  }) => {
    toast({
      title: event.title,
      description: `Scheduled for ${event.date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}`,
    });
  };

  const handleDayClick = (day: {
    day: string | number;
    date?: Date;
    events: any[];
  }) => {
    if (day.day && day.date) {
      if (day.events?.length > 0) {
        toast({
          title: `Events on ${day.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`,
          description: `${day.events.length} event${
            day.events.length > 1 ? "s" : ""
          } scheduled`,
        });
      } else {
        toast({
          title: `${day.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`,
          description: "No events scheduled for this day",
        });
      }
    }
  };

  return (
    <div
      className={`p-6 rounded-xl bg-white/100 backdrop-blur border border-white/20 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <span className="text-white font-medium">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-400 py-2"
          >
            {day}
          </div>
        ))}

        {getMonthDays().map((day, index) => (
          <div
            key={index}
            className={`text-center p-1 h-12 relative ${
              day.day ? "hover:bg-white/5 cursor-pointer" : ""
            } ${day.events?.length ? "font-medium" : ""}`}
            onClick={() => handleDayClick(day)}
          >
            <span
              className={`text-sm ${
                day.events?.length ? "text-white" : "text-gray-300"
              }`}
            >
              {day.day}
            </span>

            {day.events?.length > 0 && (
              <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Events List */}
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-gray-300">
          This Month's Events
        </h4>
        {events
          .filter(
            (event) =>
              event.date.getMonth() === currentMonth.getMonth() &&
              event.date.getFullYear() === currentMonth.getFullYear()
          )
          .map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
              onClick={() => handleEventClick(event)}
            >
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div>
                <p className="text-sm font-medium text-white">{event.title}</p>
                <p className="text-xs text-gray-400">
                  {event.date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
