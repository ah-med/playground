import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme color utilities
export const getThemeColor = (color: string, shade: number = 500) => {
  return `var(--color-${color}-${shade})`;
};

// Metallic theme utilities
export const getMetallicColor = (color: string) => {
  return `var(--color-metal-${color})`;
};

// Typography utilities
export const getFontSize = (size: string) => {
  return `var(--text-${size})`;
};

// Spacing utilities
export const getSpacing = (size: string) => {
  return `var(--spacing-${size})`;
};

// Shadow utilities
export const getShadow = (size: string) => {
  return `var(--shadow-${size})`;
};

// Border radius utilities
export const getRadius = (size: string) => {
  return `var(--radius-${size})`;
};

// Breakpoint utilities
export const getBreakpoint = (size: string) => {
  return `var(--breakpoint-${size})`;
};
