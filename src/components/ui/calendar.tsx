"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-base font-semibold text-gray-800 dark:text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 p-0 shadow-md rounded-md bg-white dark:bg-gray-800"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-medium text-[0.8rem] text-center",
        row: "flex w-full mt-2",
        cell: cn(
          "h-10 w-10 p-0 text-sm text-center flex items-center justify-center relative",
          "transition duration-100",
          "hover:shadow-inner active:translate-y-[1px] active:shadow-sm",
          "rounded-md bg-white dark:bg-gray-800 shadow border border-gray-300 dark:border-gray-600"
        ),
        day: cn(
          "w-full h-full flex items-center justify-center",
          "rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
          "hover:bg-gray-100 dark:hover:bg-gray-700"
        ),
        day_range_start: "bg-primary text-white",
        day_range_end: "bg-primary text-white",
        day_selected:
          "bg-primary text-white hover:bg-primary/90 focus:bg-primary",
        day_today: "border border-blue-500",
        day_outside: "text-muted-foreground opacity-0",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "bg-accent text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
