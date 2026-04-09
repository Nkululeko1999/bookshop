import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ShoppingCart,
  Tag,
  User2,
  Hash,
  Package
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useBooks from "@/hooks/books/use-books";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/utils/helper";
import renderRating from "@/components/rating/rating";
import type { BrowseBook } from "@/types/book.types";
import { toast } from "react-toastify";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { isPending, error, data } = useBooks("browse");

  const addToCart = useCartStore((state) => state.addToCart);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);

  const books: BrowseBook[] = Array.isArray(data?.value) ? data.value : [];

  const book = useMemo(() => {
    return books.find((item) => item.ID === id) ?? null;
  }, [books, id]);

  if (isPending) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <p>An error has occurred: {error.message}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/books">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to books
          </Link>
        </Button>

        <Card className="rounded-2xl">
          <CardContent className="py-12 text-center">
            <h1 className="text-2xl font-semibold">Book not found</h1>
            <p className="text-muted-foreground mt-2">
              The book you are looking for does not exist or is no longer
              available.
            </p>

            <Button asChild className="mt-6 rounded-xl">
              <Link to="/books">Browse books</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const quantityInCart = getItemQuantity(book.ID);
  const stock = book.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const isAtStockLimit = quantityInCart >= stock;

  const handleAddToCart = () => {
    addToCart(book);

    toast.success("Added to cart");
  };

  return (
    <div className="max-w-350 mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/books">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to books
        </Link>
      </Button>

      <div className=" grid gap-8 lg:grid-cols-[420px_1fr]">
        <Card className="p-0 overflow-hidden rounded-2xl border-border/70 shadow-sm">
          <div className="bg-muted aspect-1 w-full h-full overflow-hidden">
            <img
              src={book.imageUrl || "https://placehold.co/600x800"}
              alt={book.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://via.placeholder.com/600x800/cccccc/666666?text=${encodeURIComponent(
                    book.title || "Book"
                  )}`;
              }}
            />
          </div>
        </Card>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {book.genre ? (
              <Badge variant="outline" className="rounded-md">
                <Tag className="mr-1 h-3 w-3" />
                {book.genre}
              </Badge>
            ) : null}

            {book.type ? (
              <Badge variant="secondary" className="rounded-md">
                {book.type}
              </Badge>
            ) : null}

            <Badge
              variant={stock > 0 ? "outline" : "destructive"}
              className="rounded-md"
            >
              <Package className="mr-1 h-3 w-3" />
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </Badge>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {book.title}
          </h1>

          {book.author ? (
            <p className="text-muted-foreground mt-3 flex items-center gap-2 text-base">
              <User2 className="h-4 w-4" />
              {book.author}
            </p>
          ) : null}

          <div className="mt-4 flex items-center gap-3">
            {book.rating !== null && book.rating !== undefined ? (
              <>
                <div>{renderRating(book.rating)}</div>
                <span className="text-sm text-muted-foreground">
                  {book.rating}/10
                </span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">
                No rating yet
              </span>
            )}
          </div>

          <div className="mt-6">
            {book.price !== null && book.price !== undefined ? (
              <p className="text-3xl font-bold">
                {formatPrice(book.price, book.currency_code)}
              </p>
            ) : (
              <p className="text-muted-foreground italic">Price not available</p>
            )}
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            {book.descr ? (
              <div>
                <h2 className="mb-2 text-lg font-semibold">Description</h2>
                <p className="text-muted-foreground leading-7">{book.descr}</p>
              </div>
            ) : null}

            <div>
              <h2 className="mb-3 text-lg font-semibold">Book details</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {book.pages ? (
                  <div className="flex items-center gap-2 rounded-xl border p-3">
                    <BookOpen className="h-4 w-4" />
                    <div>
                      <p className="text-sm font-medium">Pages</p>
                      <p className="text-muted-foreground text-sm">
                        {book.pages}
                      </p>
                    </div>
                  </div>
                ) : null}

                {book.ISBN ? (
                  <div className="flex items-center gap-2 rounded-xl border p-3">
                    <Hash className="h-4 w-4" />
                    <div>
                      <p className="text-sm font-medium">ISBN</p>
                      <p className="text-muted-foreground text-sm">
                        {book.ISBN}
                      </p>
                    </div>
                  </div>
                ) : null}

                {book.type ? (
                  <div className="flex items-center gap-2 rounded-xl border p-3">
                    <Tag className="h-4 w-4" />
                    <div>
                      <p className="text-sm font-medium">Format</p>
                      <p className="text-muted-foreground text-sm">
                        {book.type}
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center gap-2 rounded-xl border p-3">
                  <Package className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Availability</p>
                    <p className="text-muted-foreground text-sm">
                      {stock > 0 ? `${stock} available` : "Out of stock"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-xl sm:min-w-48"
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAtStockLimit}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isOutOfStock
                  ? "Out of stock"
                  : isAtStockLimit
                  ? "Max in cart"
                  : "Add to cart"}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-xl sm:min-w-40"
                onClick={() => navigate("/cart")}
              >
                Go to cart
              </Button>
            </div>

            {quantityInCart > 0 && (
              <p className="text-muted-foreground text-sm">
                Already in cart: <span className="font-medium">{quantityInCart}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;