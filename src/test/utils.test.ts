import { describe, it, expect } from "vitest";
import { getInitials } from "../lib/utils";

describe("getInitials", () => {
  it("should return initials for a full name", () => {
    expect(getInitials("Rajesh Kumar")).toBe("RK");
  });

  it("should return initials for a name with more than two words by default limited to 2", () => {
    expect(getInitials("Rajesh Pratap Singh")).toBe("RP");
  });

  it("should return initials for a name with more than two words when length is increased", () => {
    expect(getInitials("Rajesh Pratap Singh", "", 3)).toBe("RPS");
  });

  it("should return uppercase initials even if name is lowercase", () => {
    expect(getInitials("priya sharma")).toBe("PS");
  });

  it("should handle extra spaces", () => {
    expect(getInitials("  Sunil   Patel  ")).toBe("SP");
  });

  it("should return fallback for null/undefined/empty name", () => {
    expect(getInitials(null, "PH")).toBe("PH");
    expect(getInitials(undefined, "PH")).toBe("PH");
    expect(getInitials("", "PH")).toBe("PH");
    expect(getInitials("   ", "PH")).toBe("PH");
  });

  it("should return single initial for single name", () => {
    expect(getInitials("Admin")).toBe("A");
  });

  it("should handle names with special characters as first letters", () => {
    expect(getInitials("123 Test")).toBe("1T");
  });
});
