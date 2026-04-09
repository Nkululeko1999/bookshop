import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { Loader2, Upload, X, Trash2 } from "lucide-react";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Book } from "@/types/book.types";
import type { Author } from "@/types/authors.types";
import type { Genre } from "@/types/genres.types";

import useAuthors from "@/hooks/authors/use-authors";
import useGenres from "@/hooks/genres/use-genres";
import { useCreateBook, useUpdateBook } from "@/api/books/books.hooks";
import { uploadToCloudinary } from "@/lib/utils";

type FormState = {
  title: string;
  author_ID: string;
  genre_ID: string;
  descr: string;
  stock: number;
  price: number;
  ISBN: string;
  type: string;
  pages: number;
  rating: number;
  currency: string;
};

type BookFormProps = {
  book: Book | null;
  onSuccess?: () => void;
  onClose?: () => void;
  readOnly?: boolean;
};

function getInitialFormData(book: Book | null): FormState {
  return {
    title: book?.title ?? "",
    author_ID: book?.author?.ID ? String(book.author.ID) : "",
    genre_ID: book?.genre?.ID ? String(book.genre.ID) : "",
    descr: book?.descr ?? "",
    stock: book?.stock ?? 0,
    price: book?.price ?? 0,
    ISBN: book?.ISBN ?? "",
    type: book?.type ?? "",
    pages: Number(book?.pages ?? 0),
    rating: Number(book?.rating ?? 0),
    currency: book?.currency_code ?? "ZAR",
  };
}

async function compressImage(file: File) {
  const options = {
    maxSizeMB: 0.7,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    initialQuality: 0.75,
  };

  return imageCompression(file, options);
}

export default function BookForm({
  book,
  onSuccess,
  onClose,
  readOnly = false,
}: BookFormProps) {
  const isEdit = Boolean(book?.ID);

  const createBook = useCreateBook();
  const updateBook = useUpdateBook();

  const { data: authorsData, isLoading: authorsLoading } = useAuthors("admin");
  const { data: genresData, isLoading: genresLoading } = useGenres("admin");

  const authors: Author[] = useMemo(() => authorsData?.value ?? [], [authorsData]);
  const genres: Genre[] = useMemo(() => genresData?.value ?? [], [genresData]);

  const [formData, setFormData] = useState<FormState>(() => getInitialFormData(book));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(book?.imageUrl ?? "");
  const [removedExistingImage, setRemovedExistingImage] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const isSaving =
    createBook.isPending ||
    updateBook.isPending ||
    isProcessingImage ||
    isUploadingImage;

  useEffect(() => {
    setFormData(getInitialFormData(book));
    setPreviewUrl(book?.imageUrl ?? "");
    setImageFile(null);
    setRemovedExistingImage(false);
  }, [book]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.author_ID) return "Author is required";
    if (!formData.genre_ID) return "Genre is required";
    if (!formData.ISBN.trim()) return "ISBN is required";
    if (!formData.type.trim()) return "Book type is required";
    if (!formData.pages || formData.pages < 1) return "Pages must be greater than 0";
    if (formData.stock < 0) return "Stock cannot be negative";
    if (formData.price < 0) return "Price cannot be negative";
    if (!formData.currency.trim()) return "Currency is required";
    return null;
  };

  const handleImageChange = async (file?: File) => {
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, and JPEG images are allowed");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image must be smaller than 8MB before compression");
      return;
    }

    try {
      setIsProcessingImage(true);

      const compressedFile = await compressImage(file);

      if (compressedFile.size > 2 * 1024 * 1024) {
        toast.error("Compressed image is still too large. Please choose a smaller image.");
        return;
      }

      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }

      setImageFile(compressedFile as File);
      setPreviewUrl(URL.createObjectURL(compressedFile));
      setRemovedExistingImage(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to process image");
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleRemoveImage = () => {
    if (readOnly || isSaving) return;

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(null);
    setPreviewUrl("");
    setRemovedExistingImage(true);
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      const payload: Record<string, string | number | boolean | null> = {
        title: formData.title.trim(),
        author_ID: formData.author_ID,
        genre_ID: formData.genre_ID,
        descr: formData.descr.trim() || null,
        stock: Number(formData.stock),
        price: Number(formData.price),
        ISBN: formData.ISBN.trim(),
        type: formData.type.trim(),
        pages: Number(formData.pages),
        rating: Number(formData.rating),
        currency_code: formData.currency.trim(),
      };

      if (imageFile) {
        toast.info(isEdit ? "Uploading new cover..." : "Uploading cover...");
        setIsUploadingImage(true);

        const uploaded = await uploadToCloudinary(imageFile);
        payload.imageUrl = uploaded.url;
        payload.imageID = uploaded.publicId;
      }

      if (removedExistingImage) {
        payload.imageUrl = null;
        payload.imageID = null;
      }

      if (isEdit && book?.ID) {
        toast.info("Updating book...");
        await updateBook.mutateAsync({
          id: book.ID,
          data: payload,
        });
        toast.success("Book updated successfully");
      } else {
        toast.info("Creating book...");
        await createBook.mutateAsync(payload);
        toast.success("Book created successfully");
      }

      onSuccess?.();
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message || "Failed to save book");
      } else {
        toast.error("Failed to save book");
      }
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div className="space-y-4 p-2">
      <Field label="Title *">
        <Input
          value={formData.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="Enter book title"
          disabled={readOnly || isSaving}
        />
      </Field>

      <Field label="Author *">
        <Select
          value={formData.author_ID}
          onValueChange={(value) => setField("author_ID", value)}
          disabled={readOnly || authorsLoading || isSaving}
        >
          <SelectTrigger>
            <SelectValue placeholder={authorsLoading ? "Loading authors..." : "Select author"} />
          </SelectTrigger>
          <SelectContent>
            {authors.map((author) => (
              <SelectItem key={author.ID} value={String(author.ID)}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Genre *">
        <Select
          value={formData.genre_ID}
          onValueChange={(value) => setField("genre_ID", value)}
          disabled={readOnly || genresLoading || isSaving}
        >
          <SelectTrigger>
            <SelectValue placeholder={genresLoading ? "Loading genres..." : "Select genre"} />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre.ID} value={String(genre.ID)}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Description">
        <Textarea
          value={formData.descr}
          onChange={(e) => setField("descr", e.target.value)}
          placeholder="Enter description"
          disabled={readOnly || isSaving}
        />
      </Field>

      <Field label="Cover Image">
        <div className="space-y-3">
          {previewUrl ? (
            <div className="relative w-40 h-52 rounded-md overflow-hidden border">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />

              {!readOnly && (
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleRemoveImage}
                  disabled={isSaving}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ) : (
            <div className="w-40 h-52 rounded-md border border-dashed flex items-center justify-center text-sm text-gray-500">
              No image
            </div>
          )}

          {!readOnly && (
            <div className="flex gap-2 flex-wrap">
              <label className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer">
                {isProcessingImage ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <span className="text-sm">
                  {isProcessingImage ? "Processing..." : "Upload image"}
                </span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleImageChange(e.target.files?.[0])}
                  disabled={isSaving}
                />
              </label>

              {(previewUrl || imageFile) && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemoveImage}
                  disabled={isSaving}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
          )}
        </div>
      </Field>

      <Field label="ISBN *">
        <Input
          value={formData.ISBN}
          onChange={(e) => setField("ISBN", e.target.value)}
          placeholder="Enter ISBN"
          disabled={readOnly || isSaving}
        />
      </Field>

      <Field label="Book Type *">
        <Select
          value={formData.type}
          onValueChange={(value) => setField("type", value)}
          disabled={readOnly || isSaving}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select book type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hardcover">Hardcover</SelectItem>
            <SelectItem value="Paperback">Paperback</SelectItem>
            <SelectItem value="Ebook">Ebook</SelectItem>
            <SelectItem value="Audiobook">Audiobook</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field label="Pages *">
        <Input
          type="number"
          min={1}
          value={formData.pages}
          onChange={(e) => setField("pages", Number(e.target.value) || 0)}
          placeholder="Number of pages"
          disabled={readOnly || isSaving}
        />
      </Field>

      <Field label="Stock">
        <Input
          type="number"
          min={0}
          value={formData.stock}
          onChange={(e) => setField("stock", Number(e.target.value) || 0)}
          placeholder="Available stock"
          disabled={readOnly || isSaving}
        />
      </Field>

      <Field label="Price">
        <Input
          type="number"
          min={0}
          step="0.01"
          value={formData.price}
          onChange={(e) => setField("price", Number(e.target.value) || 0)}
          placeholder="Book price"
          disabled={readOnly || isSaving}
        />
      </Field>

       <Field label="Rating">
        <Input
          type="number"
          min={1}
          max={10}
          step="1"
          value={formData.rating}
          onChange={(e) => setField("rating", Number(e.target.value) || 0)}
          placeholder="Book Rating"
          disabled={readOnly || isSaving}
        />
      </Field>

      <Field label="Currency">
        <Select
          value={formData.currency}
          onValueChange={(value) => setField("currency", value)}
          disabled={readOnly || isSaving}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ZAR">ZAR</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
            <SelectItem value="JPY">JPY</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <div className="flex gap-3 pt-4 border-t">
        {!readOnly && (
          <Button
            type="button"
            className="flex-1"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : isEdit ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        )}

        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onClose}
          disabled={isSaving}
        >
          {readOnly ? "Close" : "Cancel"}
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}