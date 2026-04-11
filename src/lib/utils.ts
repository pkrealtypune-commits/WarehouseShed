import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility to merge Tailwind classes without conflicts.
 * - clsx: Handles conditional logic (e.g., active && "text-primary")
 * - twMerge: Ensures the last class wins (e.g., "p-4 p-8" becomes "p-8")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}