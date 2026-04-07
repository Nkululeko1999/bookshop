import AddNewGenre from "@/components/genres/add-genre";
import GenreGrid from "@/components/genres/genre-grid";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCreateGenre from "@/hooks/genres/use-create-grenre";
import useGenres from "@/hooks/genres/use-genres";
import type { Genre } from "@/types/genres.types";
import { Plus } from "lucide-react";
import { useState } from "react";

const Genres = () => {
  const { isPending, error, data, refetch } = useGenres("admin");
  const { mutate: createGenre, isPending: isCreating } = useCreateGenre();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSubmit = (genreData: Omit<Genre, "ID">) => {
    createGenre(
      { role: "admin", formData: genreData },
      {
        onSuccess: () => {
            refetch();
          setIsSheetOpen(false); 
        },
        onError: (error) => {
          console.error("Failed to save genre:", error);
        },
      },
    );
  };

  if (isPending || isCreating) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="bg-white p-4 md:p-6 shadow rounded-sm">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-base font-medium">
          Showing {data.value.length} of Genres
        </h2>
        <div>
         <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                className="py-4 flex justify-center items-center rounded"
                size="lg"
              >
                <Plus className="w-6 h-6" />
                <span>Add New Genre</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="sheet-content-large flex flex-col h-full overflow-hidden">
              <SheetHeader className="shrink-0">
                <SheetTitle>Add New Genre</SheetTitle>
                <SheetDescription>
                  Enter the details for the new genre below.
                </SheetDescription>
              </SheetHeader>

              {/* Scrollable form area */}
              <div className="flex-1 overflow-y-auto px-1 py-4">
                <AddNewGenre 
                  genres={data.value} 
                  onSubmit={handleSubmit}
                  onClose={() => setIsSheetOpen(false)}
                  isSubmitting={isCreating}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <GenreGrid genres={data.value} />
    </div>
  );
};

export default Genres;
