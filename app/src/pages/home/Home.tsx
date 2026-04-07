import { ArrowUpDown } from "lucide-react";
import Header from "../../components/header";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useState } from "react";
import useBooks from "@/hooks/books/use-books";
import BookGrid from "@/components/books/book-grid";
import useGenres from "@/hooks/genres/use-genres";
import type { Genre } from "@/types/genres.types";
import HeroWithImage from "@/components/hero-image";

const Home = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [sort, setSort] = useState<
    "title-asc" | "title-desc" | "newest" | "oldest"
  >("newest");
  const { isPending, error, data } = useBooks("browse");
  const { data: genresData } = useGenres("browse");

  console.log(sort);

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const genres = genresData?.value || [];
  const parentGenres = genres.filter(
    (genre: Genre) => genre.parent_ID === null,
  );

  return (
    <>
      <Header />

      {/* Genre Filter Bar */}
      <div className="h-16 border-t border-b border-gray-300 flex justify-center items-center px-4 md:px-8 overflow-x-auto">
        <div className="flex items-center gap-4 text-sm">
          {parentGenres.map((genre: Genre, index: number) => (
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

      {/* Books */}
      <div className="container rounded-md mt-12 mx-2 md:mx-auto border border-gray-100 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Books ({data.value.length})</h3>
            {selectedGenreId && (
              <p className="text-sm text-gray-500 mt-1">
                Filtered by:{" "}
                {genres.find((g: Genre) => g.ID === selectedGenreId)?.name}
              </p>
            )}
          </div>

          {/* Filter and Sort */}
          <div className="flex justify-center items-center gap-2">
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
          </div>
        </div>

        {/* Books List */}
        <div className="mt-8">
          <BookGrid books={data.value} />
        </div>
      </div>
    </>
  );
};

export default Home;
