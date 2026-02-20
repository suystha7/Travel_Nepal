import { format, formatDistanceToNow, parseISO } from "date-fns";

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  const now = new Date();

  const daysDifference =
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  if (daysDifference < 1) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (daysDifference < 7) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return format(date, "dd-MMMM-yyyy");
  }
}

// Returns like: "Fri, 23 Dec 2025"
export function formatDateLong(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "EEE, dd MMM yyyy");
}
export function formatTime(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "HH:mm");
}
