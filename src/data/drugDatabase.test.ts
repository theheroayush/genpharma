import { describe, it, expect } from "vitest";
import { searchDrugs } from "./drugDatabase";

describe("searchDrugs", () => {
  it("should return an empty array if the query is less than 2 characters", () => {
    expect(searchDrugs("")).toEqual([]);
    expect(searchDrugs("a")).toEqual([]);
  });

  it("should return matches based on drug name (case-insensitive)", () => {
    const results = searchDrugs("metformin");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((drug) => {
      const match = drug.name.toLowerCase().includes("metformin") ||
                    drug.genericName.toLowerCase().includes("metformin") ||
                    drug.category.toLowerCase().includes("metformin");
      expect(match).toBe(true);
    });
    // Specifically check for Metformin 500mg
    expect(results.some(d => d.name.includes("Metformin"))).toBe(true);
  });

  it("should return matches based on generic name", () => {
    const results = searchDrugs("Glimepiride");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(d => d.genericName.includes("Glimepiride"))).toBe(true);
  });

  it("should return matches based on category", () => {
    const results = searchDrugs("Diabetes");
    expect(results.length).toBeGreaterThan(0);
    results.forEach(d => {
        const match = d.name.toLowerCase().includes("diabetes") ||
                      d.genericName.toLowerCase().includes("diabetes") ||
                      d.category.toLowerCase().includes("diabetes");
        expect(match).toBe(true);
    });
  });

  it("should return a maximum of 10 results", () => {
    // "mg" matches many drugs in the database
    const results = searchDrugs("mg");
    expect(results.length).toBe(10);
  });

  it("should return an empty array when no matches are found", () => {
    expect(searchDrugs("NonExistentDrugName")).toEqual([]);
  });

  it("should handle mixed case queries", () => {
    const results1 = searchDrugs("METFORMIN");
    const results2 = searchDrugs("metformin");
    expect(results1).toEqual(results2);
    expect(results1.length).toBeGreaterThan(0);
  });
});
