import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import type { Book } from "@/types/book.types";
import { formatPrice } from "@/utils/helper";
import renderRating from "../rating/rating";

const BookCard = ({ 
    title, 
    descr, 
    stock, 
    price, 
    rating, 
    currency_code 
}: Book) => {    

    return (
        <Card className="pt-0 rounded group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                    src="https://placehold.co/300x200"
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(title.substring(0, 15))}`;
                    }}
                />
                
                <div className="absolute top-2 right-2">
                    <Badge className={stock > 0 ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                        {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
                    </Badge>
                </div>
            </div>

            <CardContent className="pt-0 px-4 pb-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                {descr && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {descr}
                    </p>
                )}

                {renderRating(rating)}

                <div className="mt-3 pt-3 border-t">
                    <p className="text-xl font-bold text-blue-600">
                        {formatPrice(price, currency_code)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default BookCard;