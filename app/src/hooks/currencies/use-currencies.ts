import { getCurrencies } from "@/api/currencies.api";
import { currenciesKeys } from "@/queries/currencies.keys";
import { useQuery } from "@tanstack/react-query";

const useCurrencies = (role: QueryRole) => {
  return useQuery({
    queryKey: currenciesKeys.list(role),
    queryFn: () => getCurrencies(role),
  });
};

export default useCurrencies;
