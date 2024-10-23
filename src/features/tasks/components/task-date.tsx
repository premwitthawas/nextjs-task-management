"use client";

import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";
import React from "react";

interface Props {
  value: string;
  className: string;
}
const TaskDate = ({ className, value }: Props) => {
  const today = new Date();
  const endDate = new Date(value);
  const difDate = differenceInDays(endDate, today);
  let textColor = "text-muted-foreground";
  if (difDate <= 3) {
    textColor = "text-red-500";
  } else if (difDate <= 7) {
    textColor = "text-orange-500";
  } else if (difDate <= 14) {
    textColor = "text-yellow-500";
  }
  return (
    <div className={textColor}>
      <span className={cn("truncate", className)}>{format(value, "PPP")}</span>
    </div>
  );
};

export default TaskDate;
