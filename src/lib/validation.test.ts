import { describe, it, expect } from "vitest";
import { validatePassword } from "./validation";

describe("validatePassword", () => {
    it("should fail if password is too short", () => {
        const result = validatePassword("Ab1!");
        expect(result.isValid).toBe(false);
        expect(result.error).toContain("at least 8 characters");
    });

    it("should fail if password lacks uppercase", () => {
        const result = validatePassword("abcdef1!");
        expect(result.isValid).toBe(false);
        expect(result.error).toContain("uppercase letter");
    });

    it("should fail if password lacks lowercase", () => {
        const result = validatePassword("ABCDEF1!");
        expect(result.isValid).toBe(false);
        expect(result.error).toContain("lowercase letter");
    });

    it("should fail if password lacks number", () => {
        const result = validatePassword("Abcdefg!");
        expect(result.isValid).toBe(false);
        expect(result.error).toContain("number");
    });

    it("should fail if password lacks special character", () => {
        const result = validatePassword("Abcdefg1");
        expect(result.isValid).toBe(false);
        expect(result.error).toContain("special character");
    });

    it("should pass for a valid strong password", () => {
        const result = validatePassword("StrongP@ssw0rd");
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
    });
});
