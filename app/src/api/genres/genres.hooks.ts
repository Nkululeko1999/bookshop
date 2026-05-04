/* eslint-disable @typescript-eslint/no-explicit-any */
import { createGenre, deleteGenre, getGenres } from "@/api/genres/genres.api"
import { genreKeys } from "@/queries/genres.keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type DeleteParams = {
  role: QueryRole;
  id: number;
};

export const useGenres = (role: QueryRole) => {
    return useQuery({
  queryKey: genreKeys.list(role),
  queryFn: () => getGenres(role),
});
};



export const useDeleteGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteParams) => deleteGenre(params),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: genreKeys.list(variables.role),
      });

      const previousGenres = queryClient.getQueryData(
        genreKeys.list(variables.role),
      );

      queryClient.setQueryData(genreKeys.list(variables.role), (old: any) => {
        if (!old) return old;

        return {
          ...old,
          value: old.value.filter((g: any) => g.ID !== variables.id),
        };
      });

      return { previousGenres };
    },

    onError: (_, variables, context) => {
      queryClient.setQueryData(
        genreKeys.list(variables.role),
        context?.previousGenres,
      );
    },

    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: genreKeys.list(variables.role),
      });
    },
  });
};



export const useCreateGenre = () => {
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

