/**
 * Format large numbers with K (thousands) or M (millions) suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

/**
 * Format a date relative to now (e.g., "3 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  // Less than a minute
  if (seconds < 60) {
    return "just now";
  }

  // Less than an hour
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  // Less than a day
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  // Less than a week
  if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  // Less than a month
  if (seconds < 2592000) {
    const weeks = Math.floor(seconds / 604800);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  // Format as date
  return then.toLocaleDateString();
}

/**
 * Format bytes to human-readable file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
