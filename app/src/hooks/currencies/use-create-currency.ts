import { createGenre } from "@/api/genres.api";
import { currenciesKeys } from "@/queries/currencies.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGenre,

    onSuccess: (variables) => {
      // Invalidate and refetch genres query
      queryClient.invalidateQueries({
        queryKey: currenciesKeys.list(variables.role),
      });
    },
    
    onError: (error: Error) => {
      console.error("Failed to create genre:", error);
    },
  });
};

export default useCreateCurrency;
