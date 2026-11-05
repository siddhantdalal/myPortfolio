import { describe, expect, it } from "vitest";
import { formatMetric, formatRange, formatYearMonth } from "./format";

describe("formatYearMonth", () => {
  it("renders a short month and the year", () => {
    expect(formatYearMonth("2025-08")).toBe("Aug 2025");
    expect(formatYearMonth("2021-05")).toBe("May 2021");
  });
});

describe("formatRange", () => {
  it("shows Present for an ongoing role", () => {
    expect(formatRange("2025-08", null)).toBe("Aug 2025 – Present");
  });

  it("shows both ends for a finished role", () => {
    expect(formatRange("2023-03", "2024-01")).toBe("Mar 2023 – Jan 2024");
  });
});

describe("formatMetric", () => {
  it("applies prefix, suffix and decimals", () => {
    expect(formatMetric({ value: 99.9, decimals: 1, suffix: "%", label: "uptime" })).toBe("99.9%");
    expect(formatMetric({ value: 30, prefix: "<", suffix: " min", label: "MTTR" })).toBe("<30 min");
  });

  it("rounds in-between values while counting up", () => {
    expect(formatMetric({ value: 500, suffix: "K+", label: "tx" }, 123.7)).toBe("124K+");
    expect(formatMetric({ value: 99.9, decimals: 1, suffix: "%", label: "uptime" }, 42.04)).toBe("42.0%");
  });
});
