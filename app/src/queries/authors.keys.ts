export const authorKeys = {
  all: ["books"] as const,

  list: (role: QueryRole) =>
    [...authorKeys.all, role] as const,

  detail: (role: QueryRole, id: number) =>
    [...authorKeys.all, role, id] as const,
};