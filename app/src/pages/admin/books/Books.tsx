import BookGrid from "@/components/books/book-grid";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

const Books = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["books"],
    queryFn: () => fetch("/api/admin/Books").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) {
    console.log(error);

    return "Failed to load books: " + error.message;
  }

  return (
    <div className="bg-white p-4 md:p-6 shadow rounded-sm">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Our Book Collection
        </h1>
        <p className="text-gray-600 text-lg">Manage books</p>
        <div className="w-24 h-1 bg-orange-500 mt-4 rounded-full"></div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-200 rounded-sm p-4 mb-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{data.value.length}</span>{" "}
            books
          </p>
          <div className="flex justify-end gap-2">
            <Select>
              <SelectTrigger className="w-full max-w-56 border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                align="end"
                position="popper"
                sideOffset={5}
                className="w-48"
              >
                <SelectGroup className="space-y-2">
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <BookGrid books={data.value} />
    </div>
  );
};

export default Books;
