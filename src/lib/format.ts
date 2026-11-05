import type { Metric, YearMonth } from "@/content/types";

// Fixed names instead of toLocaleDateString, so the server-rendered HTML and the browser always agree.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatRange(start: YearMonth, end: YearMonth | null): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : "Present"}`;
}

/** Formats a metric, optionally at an in-between value while it counts up. */
export function formatMetric(metric: Metric, value: number = metric.value): string {
  const digits = value.toFixed(metric.decimals ?? 0);
  return `${metric.prefix ?? ""}${digits}${metric.suffix ?? ""}`;
}
