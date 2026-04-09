import type { CreateOrderPayload } from "@/types/orders.types";

export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await fetch("/api/admin/Orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error?.message || "Failed to create order");
  }

  return res.json();
};