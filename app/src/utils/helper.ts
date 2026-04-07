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
    currency: currency_code || "USD",
  }).format(price);
};
