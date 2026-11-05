/** A headline number, rendered as `${prefix}${value}${suffix}` and counted up when it scrolls into view. */
export type Metric = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

/** A month in `YYYY-MM` form. */
export type YearMonth = `${number}-${number}`;
