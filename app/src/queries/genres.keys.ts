export const genreKeys = {
  all: ["genres"] as const,

  list: (role: QueryRole) =>
    [...genreKeys.all, role] as const,

  detail: (role: QueryRole, id: number) =>
    [...genreKeys.all, role, id] as const,
};