import { Link, useNavigate } from "react-router-dom";
import Logo from "./logo";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useMemo, useState } from "react";
import useBooks from "@/hooks/books/use-books";
import type { Book } from "@/types/book.types";
import { useCartStore } from "@/lib/store/cart";
import { Search, ShoppingCart } from "lucide-react";

type SearchBook = Book & {
  author?: string | { ID: string; name: string };
  genre?: string | { ID: string; name: string };
};

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data } = useBooks("browse");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const books: SearchBook[] = data?.value || [];

  const totalItems = useCartStore((state) => state.getTotalItems());

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    return books.filter((book) => {
      const authorName =
        typeof book.author === "string"
          ? book.author
          : book.author?.name || "";

      const genreName =
        typeof book.genre === "string" ? book.genre : book.genre?.name || "";

      return (
        book.title?.toLowerCase().includes(search) ||
        book.descr?.toLowerCase().includes(search) ||
        authorName.toLowerCase().includes(search) ||
        genreName.toLowerCase().includes(search)
      );
    });
  }, [books, query]);

  return (
    <header className="bg-white border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo />
          </Link>

          <div className="hidden md:block flex-1 max-w-150">
            <Field>
              <ButtonGroup>
                <Input
                  placeholder="Search books by name, title, genre..."
                  className="py-5"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  className="cursor-pointer py-5"
                  type="button"
                  onClick={() => {
                    if (!query.trim()) return;
                    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                  }}
                >
                  Search
                </Button>
              </ButtonGroup>
            </Field>

            {query.trim() && filtered.length > 0 && (
              <div className="absolute mt-2 w-full max-w-150 rounded-md border bg-white shadow-lg z-50">
                <div className="max-h-80 overflow-y-auto py-2">
                  {filtered.slice(0, 6).map((book) => (
                    <button
                      key={book.ID}
                      type="button"
                      onClick={() => {
                        setQuery("");
                        navigate(`/books/${book.ID}`);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      <p className="font-medium">{book.title}</p>
                      {book.author && (
                        <p className="text-sm text-gray-500">
                          {typeof book.author === "string"
                            ? book.author
                            : book.author.name}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link className="relative" to="/cart">
              <ShoppingCart className="h-8 w-8" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1 text-xs bg-orange-600 text-white rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center z-50">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="block md:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 w-10 rounded-full p-0"
                  >
                    <Search className="h-6 w-6" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-80 p-0" align="end">
                  <Command>
                    <CommandInput
                      placeholder="Search books..."
                      value={query}
                      onValueChange={setQuery}
                    />

                    <CommandList className="mt-2">
                      {query.trim() && filtered.length === 0 && (
                        <CommandEmpty>No results found.</CommandEmpty>
                      )}

                      {filtered.map((book) => (
                        <CommandItem
                          key={book.ID}
                          onSelect={() => {
                            setQuery("");
                            navigate(`/books/${book.ID}`);
                          }}
                        >
                          {book.title}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;