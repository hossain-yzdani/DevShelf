export function toPersianDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const persianDate = d.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return persianDate.replace(/\//g, "/");
}

export default toPersianDate;