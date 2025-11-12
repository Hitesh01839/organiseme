import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fetchTasks = async () => {
  try {
    const res = await fetch("/api/tasks", { credentials: "include" });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
