export const bookKeys = {
  all: ["books"] as const,

  list: (role: QueryRole) =>
    [...bookKeys.all, role] as const,

  detail: (role: QueryRole, id: number) =>
    [...bookKeys.all, role, id] as const,
};