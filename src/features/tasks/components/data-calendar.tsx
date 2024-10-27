import React, { useState } from "react";
import { Task, TaskStatus } from "@/features/tasks/types";
import {
  format,
  getDay,
  parse,
  startOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/features/tasks/components/css/data-calendar.css";
import { EventCard } from "@/features/tasks/components/event-calendar-card";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
interface Props {
  data: Task[];
}

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const DataCalendar = ({ data }: Props) => {
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  );
  //MAP DATA TO USE
  const events = data.map((task) => {
    return {
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      title: task.name,
      project: task.project,
      assignee: task.assignee,
      id: task.$id,
      status: task.status as TaskStatus,
    };
  });

  //HANDLES COMPONENT
  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1));
    } else if (action === "TODAY") {
      setValue(new Date());
    }
  };

  // SUB COMPONENTS
  const CustomToolbar = ({ date, onNavigate }: CustomToolbarProps) => {
    return (
      <div className="flex mb-4 items-center w-full  justify-center lg:w-auto lg:justify-start">
        <Button
          onClick={() => onNavigate("PREV")}
          size={"icon"}
          variant={"secondary"}
          className="flex items-center"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <div className="w-full lg:w-auto flex items-center border border-input rounded-md px-3 py-2 h-8">
          <CalendarIcon className="size-4 mr-2" />
          <p className="text-sm">{format(date, "MMMM yyyy")}</p>
        </div>
        <Button
          onClick={() => onNavigate("NEXT")}
          size={"icon"}
          variant={"secondary"}
          className="flex items-center"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    );
  };
  return (
    <Calendar
      date={value}
      localizer={localizer}
      events={events}
      views={["month"]}
      defaultView="month"
      toolbar
      showAllEvents
      className="h-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, localizer) => {
          return localizer?.format(date, "EEE", culture) ?? "";
        },
      }}
      components={{
        eventWrapper: ({ event }) => {
          return (
            <EventCard
              id={event.id}
              assignee={event.assignee}
              project={event.project}
              title={event.title}
              status={event.status}
            />
          );
        },
        toolbar: () => {
          return <CustomToolbar date={value} onNavigate={handleNavigate} />;
        },
      }}
    />
  );
};
