import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates initials from a name string.
 * @param name The name to get initials from.
 * @param fallback The fallback string if name is missing or results in empty initials.
 * @param length The maximum number of initials to return.
 * @returns The initials string, in uppercase.
 */
export function getInitials(name: string | undefined | null, fallback: string = "", length: number = 2): string {
  if (!name) return fallback;
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return initials.substring(0, length) || fallback;
}
