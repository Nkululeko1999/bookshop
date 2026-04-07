import { createGenre } from "@/api/genres.api";
import { genreKeys } from "@/queries/genres.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGenre,

    onSuccess: (variables) => {
      // Invalidate and refetch genres query
      queryClient.invalidateQueries({
        queryKey: genreKeys.list(variables.role),
      });
    },
    
    onError: (error: Error) => {
      console.error("Failed to create genre:", error);
    },
  });
};

export default useCreateGenre;
