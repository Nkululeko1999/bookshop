import type { Author } from "@/types/authors.types";
import AuthorCard from "./author-card";

const AuthorGrid = ({ authors }: { authors: Author[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {
                authors.map((a: Author) => (
                    <AuthorCard name={a.name} createdAt={a.createdAt} />
                ))
            }
        </div>
    );
}

export default AuthorGrid;