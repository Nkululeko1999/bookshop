// components/genres/genre-grid-filter.tsx
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Genre } from "@/types/genres.types";
import useGenres from "@/hooks/genres/use-genres";

interface GenreGridFilterProps {
  role: QueryRole;
  selectedGenreId?: number | null;
  onGenreSelect?: (genreId: number | null) => void;
}

const GenreGridFilter = ({ role, selectedGenreId, onGenreSelect }: GenreGridFilterProps) => {
  const { data, isLoading, error } = useGenres(role);
  const [hoveredGenre, setHoveredGenre] = useState<Genre | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedSheetGenre, setSelectedSheetGenre] = useState<Genre | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-100 animate-pulse rounded" />
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error loading genres</div>;
  }

  const genres: Genre[] = data?.value || [];

  // Group genres by parent
  const parentGenres = genres.filter(genre => genre.parent_ID === null);
  const getChildGenres = (parentId: number) => genres.filter(genre => genre.parent_ID === parentId);

  const handleGenreClick = (genreId: number) => {
    if (onGenreSelect) {
      onGenreSelect(genreId);
    }
  };

  const handleClearFilter = () => {
    if (onGenreSelect) {
      onGenreSelect(null);
    }
  };

  const openGenreSheet = (genre: Genre) => {
    setSelectedSheetGenre(genre);
    setSheetOpen(true);
  };

  const selectedGenre = selectedGenreId ? genres.find(g => g.ID === selectedGenreId) : null;

  return (
    <div className="space-y-4">
      {/* Filter Header with Clear Button */}
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="font-semibold text-gray-900">Filter by Genre</h3>
        {selectedGenreId && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilter}
            className="h-6 px-2 text-xs gap-1"
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      {/* Selected Genre Badge */}
      {selectedGenre && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Selected:</span>
          <Badge className="bg-blue-600 text-white">
            {selectedGenre.name}
          </Badge>
        </div>
      )}

      {/* Genre Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-100 overflow-y-auto pr-2">
        {parentGenres.map((genre) => {
          const childGenres = getChildGenres(genre.ID);
          const hasChildren = childGenres.length > 0;
          const isSelected = selectedGenreId === genre.ID;

          return (
            <HoverCard key={genre.ID} openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Card
                  className={`
                    cursor-pointer transition-all duration-200 hover:shadow-md
                    ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => handleGenreClick(genre.ID)}
                  onMouseEnter={() => hasChildren && setHoveredGenre(genre)}
                  onMouseLeave={() => setHoveredGenre(null)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-900">
                        {genre.name}
                      </span>
                      {hasChildren && (
                        <Badge variant="secondary" className="text-xs">
                          {childGenres.length}
                        </Badge>
                      )}
                    </div>
                    {genre.descr && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {genre.descr}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </HoverCardTrigger>

              {/* Hover Card for Parent Genres with Children */}
              {hasChildren && hoveredGenre?.ID === genre.ID && (
                <HoverCardContent className="w-72 p-3" side="left" align="start">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-900">
                      Sub-genres of {genre.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {childGenres.map((child) => (
                        <Badge
                          key={child.ID}
                          variant={selectedGenreId === child.ID ? "default" : "outline"}
                          className="cursor-pointer hover:bg-blue-100 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGenreClick(child.ID);
                          }}
                        >
                          {child.name}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-xs p-0 h-auto"
                      onClick={() => openGenreSheet(genre)}
                    >
                      View all details →
                    </Button>
                  </div>
                </HoverCardContent>
              )}
            </HoverCard>
          );
        })}
      </div>

      {/* Show more link if there are many genres */}
      {parentGenres.length > 6 && (
        <div className="text-center pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => {
              // You can implement a modal or expand functionality here
              console.log("Show all genres");
            }}
          >
            Show all {parentGenres.length} genres
          </Button>
        </div>
      )}

      {/* Detailed Genre Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-100 sm:w-135 overflow-y-auto">
          {selectedSheetGenre && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedSheetGenre.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {selectedSheetGenre.descr && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600 text-sm">{selectedSheetGenre.descr}</p>
                  </div>
                )}

                {getChildGenres(selectedSheetGenre.ID).length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sub-genres</h4>
                    <div className="flex flex-wrap gap-2">
                      {getChildGenres(selectedSheetGenre.ID).map((child) => (
                        <Badge
                          key={child.ID}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-100"
                          onClick={() => {
                            handleGenreClick(child.ID);
                            setSheetOpen(false);
                          }}
                        >
                          {child.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSheetGenre.parent_ID && (() => {
                  const parentGenre = genres.find(g => g.ID === selectedSheetGenre.parent_ID);
                  return parentGenre && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Parent Genre</h4>
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-100"
                        onClick={() => {
                          handleGenreClick(parentGenre.ID);
                          setSheetOpen(false);
                        }}
                      >
                        {parentGenre.name}
                      </Badge>
                    </div>
                  );
                })()}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default GenreGridFilter;