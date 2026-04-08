import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Eye,
  Pencil,
  Trash2,
  Loader2,
  BookOpen,
  User2,
  Tag,
} from "lucide-react";

import type { Book } from "@/types/book.types";
import { formatPrice } from "@/utils/helper";
import renderRating from "../rating/rating";

type BookCardProps = {
  book: Book;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  isDeleting?: boolean;
};

const BookCard = ({
  book,
  onEdit,
  onView,
  onDelete,
  showActions = true,
  isDeleting = false,
}: BookCardProps) => {
  return (
    <Card className="pt-0 rounded-xl group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={book.imageUrl || "https://placehold.co/300x200"}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(
                book.title?.substring(0, 15) || "Book"
              )}`;
          }}
        />

        <div className="absolute top-2 right-2">
          <Badge
            className={
              (book.stock ?? 0) > 0
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }
          >
            {(book.stock ?? 0) > 0
              ? `In Stock (${book.stock})`
              : "Out of Stock"}
          </Badge>
        </div>
      </div>

      <CardContent className="px-4 pb-4 pt-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {book.title || "Untitled Book"}
        </h3>

        {book.author?.name ? (
          <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
            <User2 className="w-4 h-4" />
            by {book.author.name}
          </p>
        ) : null}

        {book.descr ? (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{book.descr}</p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 mb-2">
          {book.genre?.name ? (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {book.genre.name}
            </Badge>
          ) : null}

          {book.type ? (
            <Badge variant="secondary" className="text-xs">
              {book.type}
            </Badge>
          ) : null}

          {book.pages ? (
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {book.pages} pages
            </Badge>
          ) : null}
        </div>

        {book.rating ? <div className="mb-2">{renderRating(book.rating)}</div> : null}

        <div className="mt-3 pt-3 border-t">
          {book.price !== null && book.price !== undefined ? (
            <p className="text-xl font-bold text-blue-600">
              {formatPrice(book.price, book.currency_code)}
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">Price not available</p>
          )}
        </div>

        {showActions && (
          <div className="mt-4 flex gap-2">
            {onView && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onView}
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
            )}

            {onEdit && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onEdit}
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}

            {onDelete && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={onDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;