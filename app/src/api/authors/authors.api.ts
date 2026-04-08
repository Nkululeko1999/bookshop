import type {
  Author,
  AuthorPayload,
  ReplaceAuthorPayload,
  UpdateAuthorPayload,
} from "@/types/authors.types";

const AUTHORS_BASE = "/api/admin/Authors";

const parseJsonSafe = async (res: Response) => {
  return res.json().catch(() => null);
};

const handleError = async (res: Response, fallback: string) => {
  const json = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(json?.error?.message || json?.message || fallback);
  }
  return json;
};

export const fetchAuthors = async (): Promise<Author[]> => {
  const res = await fetch(`${AUTHORS_BASE}?$expand=books`);

  if (!res.ok) {
    throw new Error("Failed to fetch authors");
  }

  const data = await res.json();
  return data.value ?? [];
};

export const fetchAuthorById = async (id: string): Promise<Author> => {
  const res = await fetch(`${AUTHORS_BASE}/${id}`);
  const json = await handleError(res, "Failed to fetch author");
  return json;
};

export const createAuthor = async (data: AuthorPayload): Promise<Author> => {
  const res = await fetch(AUTHORS_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await handleError(res, "Failed to create author");
  return json;
};

export const replaceAuthor = async ({
  id,
  data,
}: ReplaceAuthorPayload): Promise<Author> => {
  const res = await fetch(`${AUTHORS_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await handleError(res, "Failed to replace author");
  return json;
};

export const updateAuthor = async ({
  id,
  data,
}: UpdateAuthorPayload): Promise<Author> => {
  const res = await fetch(`${AUTHORS_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await handleError(res, "Failed to update author");
  return json;
};

export const deleteAuthor = async (id: string) => {
  const res = await fetch(`${AUTHORS_BASE}/${id}`, {
    method: "DELETE",
  });

  const json = await parseJsonSafe(res);

  if (!res.ok) {
    throw new Error(json?.error?.message || json?.message || "Failed to delete author");
  }

  return json ?? true;
};