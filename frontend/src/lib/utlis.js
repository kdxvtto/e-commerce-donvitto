// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn(...) - helper untuk menggabungkan className secara aman.
 * Menggunakan clsx untuk conditional class, dan twMerge untuk
 * merge utility Tailwind yang duplicate/bertentangan.
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
