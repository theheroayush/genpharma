import { describe, it, expect } from "vitest";
import { reducer } from "./use-toast";

describe("use-toast reducer", () => {
  it("should add a toast (ADD_TOAST)", () => {
    const initialState = { toasts: [] };
    const toast = { id: "1", title: "Test Toast", open: true };
    const action = { type: "ADD_TOAST" as const, toast };
    const newState = reducer(initialState, action as any);

    expect(newState.toasts).toHaveLength(1);
    expect(newState.toasts[0]).toEqual(toast);
  });

  it("should respect TOAST_LIMIT (ADD_TOAST)", () => {
    const toast1 = { id: "1", title: "Toast 1", open: true };
    const toast2 = { id: "2", title: "Toast 2", open: true };
    const initialState = { toasts: [toast1] };
    const action = { type: "ADD_TOAST" as const, toast: toast2 };
    const newState = reducer(initialState, action as any);

    // TOAST_LIMIT is 1 in the implementation
    expect(newState.toasts).toHaveLength(1);
    expect(newState.toasts[0]).toEqual(toast2);
  });

  it("should update a toast (UPDATE_TOAST)", () => {
    const toast1 = { id: "1", title: "Toast 1", open: true } as any;
    const initialState = { toasts: [toast1] };
    const updatedToast = { id: "1", title: "Updated Toast" };
    const action = { type: "UPDATE_TOAST" as const, toast: updatedToast };
    const newState = reducer(initialState, action as any);

    expect(newState.toasts[0].title).toBe("Updated Toast");
    expect(newState.toasts[0].open).toBe(true);
  });

  it("should not update if toast id does not match (UPDATE_TOAST)", () => {
    const toast1 = { id: "1", title: "Toast 1", open: true } as any;
    const initialState = { toasts: [toast1] };
    const updatedToast = { id: "2", title: "Updated Toast" };
    const action = { type: "UPDATE_TOAST" as const, toast: updatedToast };
    const newState = reducer(initialState, action as any);

    expect(newState.toasts[0].title).toBe("Toast 1");
  });

  it("should dismiss a specific toast (DISMISS_TOAST)", () => {
    const toast1 = { id: "1", title: "Toast 1", open: true } as any;
    const initialState = { toasts: [toast1] };
    const action = { type: "DISMISS_TOAST" as const, toastId: "1" };
    const newState = reducer(initialState, action as any);

    expect(newState.toasts[0].open).toBe(false);
  });

  it("should dismiss all toasts if toastId is not provided (DISMISS_TOAST)", () => {
    const toast1 = { id: "1", title: "Toast 1", open: true } as any;
    const toast2 = { id: "2", title: "Toast 2", open: true } as any;
    const initialState = { toasts: [toast1, toast2] };
    const action = { type: "DISMISS_TOAST" as const };
    const newState = reducer(initialState, action as any);

    expect(newState.toasts[0].open).toBe(false);
    expect(newState.toasts[1].open).toBe(false);
  });

  it("should remove a specific toast (REMOVE_TOAST)", () => {
    const toast1 = { id: "1", title: "Toast 1", open: true } as any;
    const initialState = { toasts: [toast1] };
    const action = { type: "REMOVE_TOAST" as const, toastId: "1" };
    const newState = reducer(initialState, action as any);

    expect(newState.toasts).toHaveLength(0);
  });

  it("should remove all toasts if toastId is not provided (REMOVE_TOAST)", () => {
    const toast1 = { id: "1", title: "Toast 1", open: true } as any;
    const toast2 = { id: "2", title: "Toast 2", open: true } as any;
    const initialState = { toasts: [toast1, toast2] };
    const action = { type: "REMOVE_TOAST" as const };
    const newState = reducer(initialState, action as any);

    expect(newState.toasts).toHaveLength(0);
  });
});
