import { useState } from "react";
import BookGrid from "@/components/books/book-grid";
import BookForm from "@/components/books/book-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, Loader2 } from "lucide-react";
import type { Book } from "@/types/book.types";
import { useBooks } from "@/api/books/books.hooks";

type Mode = "create" | "edit" | "view";

const Books = () => {
  const { data: books = [], isLoading, isFetching, error } = useBooks();

  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [mode, setMode] = useState<Mode>("create");

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-4">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading books...</span>
      </div>
    );
  }

  if (error) return "Error loading books";

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-medium">Showing {books.length} books</h2>
          {isFetching && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Refreshing...
            </div>
          )}
        </div>

        <Sheet
          open={open}
          onOpenChange={(value) => {
            setOpen(value);
            if (!value) {
              setSelectedBook(null);
              setMode("create");
            }
          }}
        >
          <SheetTrigger asChild>
            <Button
              onClick={() => {
                setSelectedBook(null);
                setMode("create");
              }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Book
            </Button>
          </SheetTrigger>

          <SheetContent className="sheet-content-large flex flex-col h-full">
            <SheetHeader>
              <SheetTitle>
                {mode === "view"
                  ? "View Book"
                  : selectedBook
                  ? "Edit Book"
                  : "Add Book"}
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-2">
              <BookForm
                key={`${mode}-${selectedBook?.ID ?? "new"}`}
                book={selectedBook}
                readOnly={mode === "view"}
                onSuccess={() => setOpen(false)}
                onClose={() => setOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <BookGrid
        books={books}
        onEdit={(book) => {
          setSelectedBook(book);
          setMode("edit");
          setOpen(true);
        }}
        onView={(book: Book) => {
          setSelectedBook(book);
          setMode("view");
          setOpen(true);
        }}
      />
    </div>
  );
};

export default Books;