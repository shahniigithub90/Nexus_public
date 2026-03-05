import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface MeetingEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  status: "available" | "pending" | "confirmed";
}

function CalendarPage() {
  const [events, setEvents] = useState<MeetingEvent[]>([]);

  // When user selects a slot (click + drag)
  const handleSelectSlot = (slotInfo: any) => {
    const title = prompt("Enter meeting title:");

    if (!title) return;

    const newEvent: MeetingEvent = {
      id: Date.now(),
      title,
      start: slotInfo.start,
      end: slotInfo.end,
      status: "pending",
    };

    setEvents([...events, newEvent]);
  };

  // Accept / Decline logic
  const handleSelectEvent = (event: MeetingEvent) => {
    if (event.status === "confirmed") return;

    const action = window.confirm(
      "Click OK to Confirm.\nClick Cancel to Decline."
    );
const updatedEvents: MeetingEvent[] = events.map((e) =>
  e.id === event.id
    ? {
        ...e,
        status: action
          ? ("confirmed" as "confirmed")
          : ("available" as "available"),
      }
    : e
);
    setEvents(updatedEvents);
  };

  // Color events by status
  const eventStyleGetter = (event: MeetingEvent) => {
    let backgroundColor = "#3174ad";

    if (event.status === "pending") backgroundColor = "orange";
    if (event.status === "confirmed") backgroundColor = "green";
    if (event.status === "available") backgroundColor = "gray";

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        color: "white",
        border: "none",
      },
    };
  };

  return (
    <div style={{ height: "600px", margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        defaultView="week"
      />
    </div>
  );
}

export default CalendarPage;