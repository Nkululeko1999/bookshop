import type { Genre } from "@/types/genres.types";
import GenreCard from "./genre-card";

const GenreGrid = ({ genres }: { genres: Genre[]}) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {
                genres.map((g: Genre) => (
                    <GenreCard key={g.ID} name={g.name} id={g.ID} showDelete={true} />
                ))
            }
        </div>
    );
}

export default GenreGrid;