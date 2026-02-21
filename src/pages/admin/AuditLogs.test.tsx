import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import AuditLogs from "./AuditLogs";

// Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => ({
          limit: async () => {
            // Generate a dataset to test performance
            const data = Array.from({ length: 1000 }, (_, i) => ({
              id: i,
              user_email: `user${i}@example.com`,
              action: ["login", "logout", "create_user", "delete_user", "update_role"][i % 5],
              details: `Details for action ${i}`,
              created_at: new Date().toISOString(),
            }));
            return { data, error: null };
          },
        }),
      }),
    }),
  },
}));

describe("AuditLogs Component", () => {
  it("renders correctly during rapid filtering", { timeout: 5000 }, async () => {
    render(<AuditLogs />);

    // Wait for data to load
    await screen.findByText(/1000 events logged/);

    const input = screen.getByPlaceholderText("Search logs...");

    // Simulate typing quickly to trigger re-renders
    await act(async () => {
      for (let i = 0; i < 100; i++) {
        fireEvent.change(input, { target: { value: `user${i}` } });
      }
    });
  });
});
