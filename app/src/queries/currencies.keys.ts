export const currenciesKeys = {
  all: ["currencies"] as const,

  list: (role: QueryRole) =>
    [...currenciesKeys.all, role] as const,

  detail: (role: QueryRole, id: number) =>
    [...currenciesKeys.all, role, id] as const,
};