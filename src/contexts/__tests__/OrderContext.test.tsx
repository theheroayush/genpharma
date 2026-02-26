import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { OrderProvider, useOrders } from "../OrderContext";
import React from "react";

describe("OrderContext", () => {
  it("should provide initial orders from seedData", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <OrderProvider>{children}</OrderProvider>
    );
    const { result } = renderHook(() => useOrders(), { wrapper });

    expect(result.current.orders).toBeDefined();
    expect(result.current.orders.length).toBeGreaterThan(0);
    expect(result.current.orders[0].id).toContain("#ORD-");
  });

  it("should update orders", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <OrderProvider>{children}</OrderProvider>
    );
    const { result } = renderHook(() => useOrders(), { wrapper });

    act(() => {
      result.current.setOrders([]);
    });

    expect(result.current.orders).toEqual([]);
  });

  it("should throw error when used outside of OrderProvider", () => {
    // Suppress console.error for this test as it's expected
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useOrders());
    }).toThrow("useOrders must be used within an OrderProvider");

    consoleSpy.mockRestore();
  });
});
