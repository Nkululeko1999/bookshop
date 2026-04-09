import { getCurrencies } from "@/api/currencies.api";
import { useQuery } from "@tanstack/react-query";

const useCurrencies = (
  role: QueryRole,
  page: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ["currencies", role, page, pageSize],
    queryFn: () => getCurrencies(role, page, pageSize),
    placeholderData: (prev) => prev,
  });
};

export default useCurrencies;