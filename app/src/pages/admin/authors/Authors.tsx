import { useState } from "react";
import AuthorGrid from "@/components/authors/author-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthors, useDeleteAuthor } from "@/api/authors/authors.hooks";
import AuthorSheet from "@/components/authors/author-sheet";

type SheetMode = "create" | "view" | "edit" | "replace";

const Authors = () => {
  const { isPending, error, data = [] } = useAuthors();
  const deleteMutation = useDeleteAuthor();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SheetMode>("create");
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const handleOpen = (sheetMode: SheetMode, id?: string) => {
    setMode(sheetMode);
    setSelectedId(id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this author?");
    if (!confirmed) return;

    deleteMutation.mutate(id);
  };

  if (isPending) return "Loading...";

  if (error) {
    return "Failed to load authors: " + (error as Error).message;
  }

  return (
    <div className="bg-white p-4 md:p-6 shadow rounded-sm">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Authors</h2>

        <div className="flex items-center gap-3">
          <Badge className="text-[14.5px] text-black font-medium p-3 bg-gray-200">
            Total: {data.length}
          </Badge>

          <Button onClick={() => handleOpen("create")}>
            Add Author
          </Button>
        </div>
      </div>

      <AuthorGrid
        authors={data}
        onView={(id) => handleOpen("view", id)}
        onEdit={(id) => handleOpen("edit", id)}
        onReplace={(id) => handleOpen("replace", id)}
        onDelete={handleDelete}
      />

      <AuthorSheet
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        authorId={selectedId}
      />
    </div>
  );
};

export default Authors;