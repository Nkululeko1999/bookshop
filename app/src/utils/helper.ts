export const formatDate = (date?: string | Date) => {
  if (!date) return "Member since: Recently";

  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatPrice = (price?: number | null, currency_code?: string | null) => {
  if (!price) return "Price not set";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency_code || "ZAR",
  }).format(price);
};

export function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}
