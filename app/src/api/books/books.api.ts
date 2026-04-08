export const fetchBooks = async () => {
  const res = await fetch("/api/admin/Books?$expand=author&$expand=genre");

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await res.json();
  return data.value;
};

export const createBook = async (
  data: Record<string, string | number | boolean | null>
) => {
  const res = await fetch("/api/admin/Books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      json?.error?.message || json?.message || "Failed to create book"
    );
  }

  return json;
};

export const updateBook = async ({
  id,
  data,
}: {
  id: number | string;
  data: Record<string, string | number | boolean | null>;
}) => {
  const res = await fetch(`/api/admin/Books/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      json?.error?.message || json?.message || "Failed to update book"
    );
  }

  return json;
};

export const deleteBook = async (id: number | string) => {
  const res = await fetch(`/api/admin/Books/${id}`, {
    method: "DELETE",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      json?.error?.message || json?.message || "Failed to delete book"
    );
  }

  return json ?? true;
};