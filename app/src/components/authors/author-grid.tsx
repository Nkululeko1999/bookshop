import type { Author } from "@/types/authors.types";
import AuthorCard from "./author-card";

interface AuthorGridProps {
  authors: Author[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onReplace: (id: string) => void;
  onDelete: (id: string) => void;
}

const AuthorGrid = ({
  authors,
  onView,
  onEdit,
  onReplace,
  onDelete,
}: AuthorGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {authors.map((a) => (
        <AuthorCard
          key={a.ID}
          id={a.ID}
          name={a.name}
          createdAt={a.createdAt}
          imageUrl={a.avatar ?? undefined}
          onView={onView}
          onEdit={onEdit}
          onReplace={onReplace}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AuthorGrid;