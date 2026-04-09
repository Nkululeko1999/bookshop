/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowUpDown, BookOpen, ShoppingCart, Tag, User2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useBooks from "@/hooks/books/use-books";
import useGenres from "@/hooks/genres/use-genres";
import type { Genre } from "@/types/genres.types";
import type { BrowseBook } from "@/types/book.types";
import HeroWithImage from "@/components/hero-image";
import { formatPrice } from "@/utils/helper";
import renderRating from "@/components/rating/rating";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
  const [sort, setSort] = useState<
    "title-asc" | "title-desc" | "newest" | "oldest"
  >("newest");

  const { isPending, error, data } = useBooks("browse");
  const { data: genresData } = useGenres("browse");

  const addToCart = useCartStore((state) => state.addToCart);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);

  const books: BrowseBook[] = Array.isArray(data?.value) ? data.value : [];
  const genres: Genre[] = Array.isArray(genresData?.value) ? genresData.value : [];

  const parentGenres = useMemo(() => {
    return genres.filter((genre) => genre.parent_ID === null);
  }, [genres]);

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    if (selectedGenreId) {
      const selectedGenre = genres.find((g) => g.ID === selectedGenreId);

      result = result.filter((book) => {
        return (
          book.genre === selectedGenre?.name ||
          book.genre === selectedGenre?.ID
        );
      });
    }

    result.sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

    return result;
  }, [books, genres, selectedGenreId, sort]);

  const handleViewBook = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  const handleAddToCart = (book: BrowseBook) => {
    addToCart(book);
    toast.success("Added to cart");
  };

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="h-16 border-t border-b border-gray-300 flex justify-center items-center px-4 md:px-8 overflow-x-auto">
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => setSelectedGenreId(null)}
            className={`hover:text-orange-600 transition-colors whitespace-nowrap ${
              selectedGenreId === null
                ? "text-orange-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            All
          </button>

          {parentGenres.map((genre, index) => (
            <div key={genre.ID} className="flex items-center gap-4">
              <button
                onClick={() => setSelectedGenreId(genre.ID)}
                className={`hover:text-orange-600 transition-colors whitespace-nowrap ${
                  selectedGenreId === genre.ID
                    ? "text-orange-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {genre.name}s
              </button>

              {index < parentGenres.length - 1 && (
                <span className="text-gray-300 font-semibold">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 rounded mt-4 md:mt-8">
        <HeroWithImage
          title="Your Next Chapter Starts Here"
          subtitle="Shop With Us"
          description="Uncover books that inspire, entertain, and stay with you—old favorites and new hits alike."
          imageUrl="/images/banner-image-no-background.png"
          imagePosition="right"
        />
      </div>

      <div className="px-4 md:px-8 mt-4 md:mt-8 mx-2 md:mx-auto border border-gray-100 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">
              Books ({filteredAndSortedBooks.length})
            </h3>

            {selectedGenreId && (
              <p className="text-sm text-gray-500 mt-1">
                Filtered by: {genres.find((g) => g.ID === selectedGenreId)?.name}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setSort("title-asc")}>
                  Title (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("title-desc")}>
                  Title (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("newest")}>
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("oldest")}>
                  Oldest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredAndSortedBooks.map((book) => {
              const quantityInCart = getItemQuantity(book.ID);
              const stock = book.stock ?? 0;
              const isOutOfStock = stock <= 0;
              const isAtStockLimit = quantityInCart >= stock;

              return (
                <Card
                  key={book.ID}
                  onClick={() => handleViewBook(book.ID)}
                  className="pt-0 rounded-xl group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={book.imageUrl || "https://placehold.co/300x200"}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(
                            book.title.substring(0, 15) || "Book"
                          )}`;
                      }}
                    />

                    <div className="absolute top-2 right-2">
                      <Badge
                        className={
                          stock > 0
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }
                      >
                        {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="px-4 pb-4 pt-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {book.title || "Untitled Book"}
                    </h3>

                    {book.author ? (
                      <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                        <User2 className="w-4 h-4" />
                        by {book.author}
                      </p>
                    ) : null}

                    {book.descr ? (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {book.descr}
                      </p>
                    ) : null}

                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {book.genre ? (
                        <Badge
                          variant="outline"
                          className="text-xs flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {book.genre}
                        </Badge>
                      ) : null}

                      {book.type ? (
                        <Badge variant="secondary" className="text-xs">
                          {book.type}
                        </Badge>
                      ) : null}

                      {book.pages ? (
                        <Badge
                          variant="secondary"
                          className="text-xs flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3" />
                          {book.pages} pages
                        </Badge>
                      ) : null}
                    </div>

                    {book.rating ? (
                      <div className="mb-2">{renderRating(book.rating)}</div>
                    ) : null}

                    <div className="mt-3 pt-3 border-t">
                      {book.price !== null && book.price !== undefined ? (
                        <p className="text-xl font-bold text-blue-600">
                          {formatPrice(book.price, book.currency_code)}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          Price not available
                        </p>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      {quantityInCart > 0 && (
                        <p className="text-xs text-gray-500">
                          In cart: {quantityInCart}
                        </p>
                      )}

                      <Button
                        type="button"
                        className="w-full gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(book);
                        }}
                        disabled={isOutOfStock || isAtStockLimit}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {isOutOfStock
                          ? "Out of stock"
                          : isAtStockLimit
                          ? "Max in cart"
                          : "Add to cart"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;