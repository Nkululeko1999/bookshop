import type { Currency } from "@/types/currencies.types";

type DeleteParams = {
    id: number;
}

export const getCurrencies = async () => {    
  const res = await fetch(`/api/admin/Currencies`);
 
  return res.json();
};

export const deleteCurrency = async (params: DeleteParams) => {
  const res = await fetch(`/api/admin/Currencies/${params.id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete currency");
  return res.json();
};

export const createCurrency = async (formData: Omit<Currency, "ID">) => {
  const res = await fetch(`/api/admin/Currencies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  if (!res.ok) throw new Error("Failed to create genre");
  return res.json();
}