import { describe, expect, it } from "vitest";
import { formatPublishedDate } from "./utils";

describe("formatPublishedDate", () => {
  it("formats a valid publication timestamp in Jakarta time", () => {
    expect(formatPublishedDate("2026-09-22T14:10:08.436+00:00")).toBe(
      "22 September 2026 pukul 21.10 WIB",
    );
  });

  it("returns null for missing or invalid timestamps", () => {
    expect(formatPublishedDate(null)).toBeNull();
    expect(formatPublishedDate("invalid-date")).toBeNull();
  });
});
