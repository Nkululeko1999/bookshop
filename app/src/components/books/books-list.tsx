import { Eye, ShoppingCart } from "lucide-react";
import type { Book } from "../../types/book.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface BooksList {
  books: Book[];
  addCart: (id: number, quantity: number) => void;
}

const BooksList = ({ books, addCart }: BooksList) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25 text-left">Title</TableHead>
          <TableHead className="text-left">Author</TableHead>
          <TableHead className="text-left">Genre</TableHead>
          <TableHead className="text-left">Price</TableHead>
          <TableHead className="text-left">Stock</TableHead>
          <TableHead className="text-center">Rating</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.ID}>
            <TableCell className="font-medium">{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{book.price === null ? 0 : book.price}</TableCell>
            <TableCell>{book.stock}</TableCell>
            <TableCell className="text-center">
              {book.rating === null ? "No rating" : book.rating}
            </TableCell>
            {/* View Book */}
            <TableCell className="flex justify-end items-center gap-4">
                <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => navigate(`/books/${book.ID}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>

            {/* Add to Cart */}
            <Button
              variant="default"
              size="icon"
              className="h-9 w-9"
              onClick={() => addCart(book.ID, 1)}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BooksList;
