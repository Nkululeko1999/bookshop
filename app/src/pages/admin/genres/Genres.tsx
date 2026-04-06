import GenreGrid from "@/components/genres/genre-grid";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

const Genres = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["genres"],
        queryFn: () => fetch("/api/admin/Genres").then((res) => res.json())
    });

    if(isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;


    return (
        <div className="bg-white p-4 md:p-6 shadow rounded-md">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Genres</h2>
                <Badge className="text-[14.5px] text-black font-medium p-3 bg-gray-200">Total: {data.value.length}</Badge>
            </div>
            <GenreGrid genres={data.value} />
        </div>
    );
};

export default Genres;