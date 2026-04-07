import type { Book } from "@/types/book.types";
import BookCard from "./book-card";

interface BookGridProps {
  books: Book[];
  emptyMessage?: string;
}

const BookGrid = ({
  books,
  emptyMessage = "No books found",
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


      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((b) => (
          <BookCard
            key={b.ID}
            book={b}
          />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
