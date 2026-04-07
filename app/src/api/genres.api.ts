import type { Genre } from "@/types/genres.types";

type DeleteParams = {
  role: QueryRole;
  id: number;
};

type CreateParams = {
  role: QueryRole
  formData: Omit<Genre, "ID">;

}

export const getGenres = async (role: QueryRole) => {    
  const res = await fetch(`/api/${role}/Genres`);
 
  return res.json();
};

export const deleteGenre = async (params: DeleteParams) => {
  const res = await fetch(`/api/${params.role}/Genres/${params.id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete genre");
  return res.json();
};

export const createGenre = async (params: CreateParams) => {
  const res = await fetch(`/api/${params.role}/Genres`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params.formData)
  })

  if (!res.ok) throw new Error("Failed to delete genre");
  return res.json();
}