/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteGenre } from "@/api/genres.api";
import { genreKeys } from "@/queries/genres.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteParams = {
  role: QueryRole;
  id: number;
};

const useDeleteGenre = () => {
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

export default useDeleteGenre;
