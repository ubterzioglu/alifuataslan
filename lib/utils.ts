export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function absoluteUrl(path = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `https://www.alifuataslan.com${cleanPath}`;
}
