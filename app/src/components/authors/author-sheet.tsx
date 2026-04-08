import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import AuthorForm from "./author-form";
import {
  useAuthor,
  useCreateAuthor,
  useReplaceAuthor,
  useUpdateAuthor,
} from "@/api/authors/authors.hooks";
import type { AuthorPayload } from "@/types/authors.types";
import { formatDate } from "@/utils/helper";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "@/lib/utils";

type Mode = "create" | "view" | "edit" | "replace";

interface AuthorSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: Mode;
  authorId?: string;
}

const AuthorSheet = ({
  open,
  onOpenChange,
  mode,
  authorId,
}: AuthorSheetProps) => {
  const isCreate = mode === "create";
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isReplace = mode === "replace";

  const { data: author, isLoading } = useAuthor(authorId, open && !isCreate);

  const createMutation = useCreateAuthor();
  const updateMutation = useUpdateAuthor();
  const replaceMutation = useReplaceAuthor();

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending ||
    replaceMutation.isPending;

  const handleSubmit = async (
    data: { name: string },
    imageFile?: File | null,
    removeImage?: boolean
  ) => {
    try {
      const payload: AuthorPayload = {
        name: data.name,
      };

      if (imageFile) {
        toast.info(isCreate ? "Uploading avatar..." : "Uploading new avatar...");
        const uploaded = await uploadToCloudinary(imageFile);
        payload.avatar = uploaded.url;
        payload.avatarID = uploaded.publicId;
      }

      if (removeImage) {
        payload.avatar = null;
        payload.avatarID = null;
      }

      if (isCreate) {
        toast.info("Creating author...");
        await createMutation.mutateAsync(payload);
        toast.success("Author created successfully");
        onOpenChange(false);
        return;
      }

      if (isEdit && authorId) {
        toast.info("Updating author...");
        await updateMutation.mutateAsync({
          id: authorId,
          data: payload,
        });
        toast.success("Author updated successfully");
        onOpenChange(false);
        return;
      }

      if (isReplace && authorId) {
        toast.info("Replacing author...");
        await replaceMutation.mutateAsync({
          id: authorId,
          data: payload,
        });
        toast.success("Author replaced successfully");
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message || "Failed to save author");
      } else {
        toast.error("Failed to save author");
      }
    }
  };

  const title = isCreate
    ? "Create Author"
    : isView
      ? "View Author"
      : isEdit
        ? "Edit Author"
        : "Replace Author";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sheet-content-large overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {isCreate && "Add a new author."}
            {isView && "View author details."}
            {isEdit && "Update selected author."}
            {isReplace && "Replace selected author."}
          </SheetDescription>
        </SheetHeader>

        {isLoading && !isCreate ? <p>Loading author...</p> : null}

        {isView && author ? (
          <div className="space-y-6 mx-4">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={author.avatar || "/images/avatar-default.png"}
                  alt={author.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/avatar-default.png";
                  }}
                />
              </div>

              <div className="space-y-1 text-sm">
                <p className="text-lg font-semibold">{author.name}</p>
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {formatDate(author.createdAt) || "-"}
                </p>
              </div>
            </div>

            {author.books?.length ? (
              <div className="space-y-3">
                <h3 className="text-base font-semibold">Books</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {author.books.map((book) => (
                    <Card
                      key={book.ID}
                      className="rounded-xl border border-slate-200 shadow-sm"
                    >
                      <CardContent className="p-4 space-y-2">
                        <p className="font-medium text-slate-900">
                          {book.title}
                        </p>
                        <p className="text-sm text-slate-500">
                          Genre: {book.genre?.name || "-"}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}

            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : null}

        {(isCreate || isEdit || isReplace) && (
          <AuthorForm
            key={`${mode}-${author?.ID ?? "new"}`}
            author={isCreate ? null : author}
            onSubmit={handleSubmit}
            onClose={() => onOpenChange(false)}
            isSubmitting={isSubmitting}
            readOnly={false}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AuthorSheet;