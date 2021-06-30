import { getDurationInMonths } from "./getDurationInMonths";
import { getDurationInWeeks } from "./getDurationInWeeks";
import {
  PromotionDurationOutput,
  PromotionDurationType,
} from "../types/PromotionDurationType";
import { getDurationInTime } from "./getDurationInTime";

const dayInMilliSeconds = 1000 * 60 * 60 * 24;

export const getPromotionDuration = (
  startDate: Date,
  endDate: Date
): PromotionDurationOutput => {
  const endDateTime = endDate.getTime();
  const startDateTime = startDate.getTime();

  const daysDifference = (endDateTime - startDateTime) / dayInMilliSeconds;

  if (daysDifference <= 0) {
    return { type: PromotionDurationType.finished, value: 0 };
  }

  if (daysDifference > 30) return getDurationInMonths(daysDifference);
  if (daysDifference > 10) return getDurationInWeeks(daysDifference);
  if (daysDifference > 2)
    return {
      type: PromotionDurationType.days,
      value: Math.round(daysDifference),
    };

  const hours = daysDifference * 24;
  if (hours >= 12) {
    return { type: PromotionDurationType.hours, value: hours };
  }

  return getDurationInTime(startDate, endDate);
};
