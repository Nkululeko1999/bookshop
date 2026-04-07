import { getGenres } from "@/api/genres.api"
import { genreKeys } from "@/queries/genres.keys"
import { useQuery } from "@tanstack/react-query"

const useGenres = (role: QueryRole) => {
    return useQuery({
  queryKey: genreKeys.list(role),
  queryFn: () => getGenres(role),
});
};

export default useGenres;