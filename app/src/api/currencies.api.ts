import type { Currency } from "@/types/currencies.types";

type DeleteParams = {
    id: number;
    role: QueryRole;
}

type CreateParams = {
    role: QueryRole;
    formData: Omit<Currency, "ID">;
}

export const getCurrencies = async (role: QueryRole) => {    
  const res = await fetch(`/api/${role}/Currencies`);
 
  return res.json();
};

export const deleteCurrency = async (params: DeleteParams) => {
  const res = await fetch(`/api/${params.role}/Currencies/${params.id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete currency");
  return res.json();
};

export const createCurrency = async (params: CreateParams) => {
  const res = await fetch(`/api/${params.role}/Currencies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params.formData)
  })

  if (!res.ok) throw new Error("Failed to create genre");
  return res.json();
}