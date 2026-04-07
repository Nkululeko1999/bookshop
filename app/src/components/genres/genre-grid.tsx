import type { Genres } from "@/types/genres.types";
import GenreCard from "./genre-card";

const GenreGrid = ({ genres, onDelete }: { genres: Genres[], onDelete?: (id: number) => void }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {
                genres.map((g: Genres) => (
                    <GenreCard name={g.name} id={g.ID} showDelete={true} onDelete={onDelete} />
                ))
            }
        </div>
    );
}

export default GenreGrid;