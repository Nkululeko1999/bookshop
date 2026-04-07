type DeleteParams = {
  role: QueryRole;
  id: number;
};

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