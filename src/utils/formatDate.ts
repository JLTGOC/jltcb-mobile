const parseDate = (value: string): Date | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const mdyMatch = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (mdyMatch) {
    const [, month, day, year] = mdyMatch;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));
    if (!Number.isNaN(parsed.getTime())) return parsed;
    return null;
  }

  const normalized = trimmed.replace(/\//g, "-");
  const ymdMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (ymdMatch) {
    const [, year, month, day] = ymdMatch;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));
    if (!Number.isNaN(parsed.getTime())) return parsed;
    return null;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
};

export const formatDate = (dateString?: string | null) => {
  if (!dateString) return "N/A";

  const date = parseDate(dateString);
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};