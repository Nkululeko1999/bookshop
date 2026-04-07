/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteGenre } from "@/api/genres.api";
import { currenciesKeys } from "@/queries/currencies.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteParams = {
  role: QueryRole;
  id: number;
};

const useDeleteCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteParams) => deleteGenre(params),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: currenciesKeys.list(variables.role),
      });

      const previousGenres = queryClient.getQueryData(
        currenciesKeys.list(variables.role),
      );

      queryClient.setQueryData(currenciesKeys.list(variables.role), (old: any) => {
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
        currenciesKeys.list(variables.role),
        context?.previousGenres,
      );
    },

    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: currenciesKeys.list(variables.role),
      });
    },
  });
};

export default useDeleteCurrency;
