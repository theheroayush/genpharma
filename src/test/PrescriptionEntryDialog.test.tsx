import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PrescriptionEntryDialog } from "../components/pharmacist/PrescriptionEntryDialog";

// Mock useToast
vi.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock Data
vi.mock("@/data/drugDatabase", () => ({
  searchDrugs: vi.fn(() => []),
}));

// Mock Lucide icons
vi.mock("lucide-react", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Plus: () => <svg data-testid="plus-icon" />,
    X: () => <svg data-testid="x-icon" />,
    Pill: () => <svg data-testid="pill-icon" />,
    Image: () => <svg data-testid="image-icon" />,
    // ChevronDown is used in Select component
    ChevronDown: () => <svg data-testid="chevron-down-icon" />,
  };
});

describe("PrescriptionEntryDialog", () => {
  it("should have accessible image upload area", () => {
    // Render the dialog
    render(
      <PrescriptionEntryDialog
        open={true}
        onClose={() => {}}
        onSave={() => {}}
      />
    );

    // Find the upload area by its text content
    const uploadText = screen.getByText("Click to upload prescription photo");

    // The clickable div is the parent of the parent of the text (based on the structure)
    // Structure:
    // div (clickable)
    //   div (flex col)
    //     ImageIcon
    //     span (text)

    // Alternatively, we can traverse up the DOM
    let currentElement: HTMLElement | null = uploadText;
    while (currentElement && !currentElement.classList.contains("border-dashed")) {
        currentElement = currentElement.parentElement;
    }
    const clickableArea = currentElement;

    expect(clickableArea).toBeInTheDocument();

    // These assertions are expected to fail before the fix
    expect(clickableArea).toHaveAttribute("role", "button");
    expect(clickableArea).toHaveAttribute("tabIndex", "0");
    expect(clickableArea).toHaveAttribute("aria-label", "Upload prescription image");
  });
});
