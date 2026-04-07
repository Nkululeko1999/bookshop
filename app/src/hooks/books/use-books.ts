import { getBooks } from "@/api/books.api";
import { bookKeys } from "@/queries/books.keys";
import { useQuery } from "@tanstack/react-query";

const useBooks = (role: QueryRole) => {
  return useQuery({
    queryKey: bookKeys.list(role),
    queryFn: () => getBooks(role),
  });
};

export default useBooks;
