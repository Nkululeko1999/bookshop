import type { Book } from "@/types/book.types";
import BookCard from "./book-card";

interface BookGridProps {
  books: Book[];
  emptyMessage?: string;
  onEdit?: (book: Book) => void;
  onView?: (book: Book) => void;
  onDelete?: (book: Book) => void;
  showActions?: boolean;
}

const BookGrid = ({
  books,
  emptyMessage = "No books found",
  onEdit,
  onView,
  onDelete,
  showActions = true,
}: BookGridProps) => {
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.ID}
            book={book}
            onEdit={onEdit ? () => onEdit(book) : undefined}
            onView={onView ? () => onView(book) : undefined}
            onDelete={onDelete ? () => onDelete(book) : undefined}
            showActions={showActions}
          />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;