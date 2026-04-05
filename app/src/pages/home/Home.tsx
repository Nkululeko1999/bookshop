import { ArrowUpDown, Filter } from "lucide-react";
import Header from "../../components/header";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useState } from "react";
import BooksList from "../../components/books/books-list";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<
    "title-asc" | "title-desc" | "newest" | "oldest"
  >("newest");
  const { isPending, error, data } = useQuery({
    queryKey: ["books"],
    queryFn: () => fetch("/api/browse/Books").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  console.log(sort);

  const toggleFilter = (category: string) => {
    setFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const addCart = (id: number, quantity: number) => {
    console.log(`Book of ID ${id} added to cart: Quantity ${quantity} `);
  };

  return (
    <>
      <Header />

      {/* Books */}
      <div className="container bg-white rounded-md h-150 mt-12 mx-2 md:mx-auto  border border-gray-100 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Books({data.value.length})</h3>
          </div>

          {/* Filter and Sort */}
          <div className="flex items-center gap-2">
            {/* 🔽 SORT */}
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

            {/* 🎛 FILTER */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-64 p-4 space-y-3">
                <p className="text-sm font-medium">Filter by Genre</p>

                <div className="flex flex-col gap-2">
                  {["Fiction", "Non-Fiction", "Science", "History"].map(
                    (cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={filters.includes(cat)}
                          onChange={() => toggleFilter(cat)}
                        />
                        {cat}
                      </label>
                    ),
                  )}
                </div>

                <Button
                  size="sm"
                  className="w-full mt-2"
                  onClick={clearFilters}
                >
                  Clear filters
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Books List */}
        <div className="mt-8">
          <BooksList books={data.value} addCart={addCart} />
        </div>
      </div>
    </>
  );
};

export default Home;
