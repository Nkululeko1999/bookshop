import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import type { Book } from "@/types/book.types";
import { formatPrice } from "@/utils/helper";
import renderRating from "../rating/rating";

const BookCard = ({ book } :{ book: Book}) => {    

    return (
        <Card className="pt-0 rounded group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                    src="https://placehold.co/300x200"
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(book.title.substring(0, 15))}`;
                    }}
                />
                
                <div className="absolute top-2 right-2">
                    <Badge className={book.stock > 0 ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                        {book.stock > 0 ? `In Stock (${book.stock})` : 'Out of Stock'}
                    </Badge>
                </div>
            </div>

            <CardContent className="pt-0 px-4 pb-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {book.title}
                </h3>

                {book.author && (
                    <p className="text-sm text-gray-500 mb-2">
                        by {book.author}
                    </p>
                )}

                {book.descr && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                        {book.descr}
                    </p>
                )}

                <div className="flex items-center gap-2 mb-2">
                    {book.genre && (
                        <Badge variant="outline" className="text-xs">
                            {book.genre}
                        </Badge>
                    )}
                </div>

                {renderRating(book.rating)}

                <div className="mt-3 pt-3 border-t">
                    {book.price ? (
                        <p className="text-xl font-bold text-blue-600">
                            {formatPrice(book.price, book.currency_code)}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500 italic">
                            Price not available
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default BookCard;