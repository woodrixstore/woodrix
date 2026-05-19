export function formatPKR(amount: number): string {
  const n = Math.round(amount);
  return `PKR ${n.toLocaleString("en-PK")}`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function estimatedDelivery(method: string, from = new Date()): string {
  const days = method === "express" ? 3 : 7;
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}
