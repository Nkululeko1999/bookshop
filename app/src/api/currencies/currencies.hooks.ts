import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "./currencies.api";

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