import { getAuthors } from "@/api/authors.api";
import { authorKeys } from "@/queries/authors.keys";
import { useQuery } from "@tanstack/react-query";

const useAuthors= (role: QueryRole) => {
  return useQuery({
    queryKey: authorKeys.list(role),
    queryFn: () => getAuthors(role),
  });
};

export default useAuthors;
