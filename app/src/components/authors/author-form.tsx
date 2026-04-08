import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { Loader2, Upload, X, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Author } from "@/types/authors.types";

type AuthorFormState = {
  name: string;
};

export type AuthorFormPayload = {
  name: string;
};

interface AuthorFormProps {
  author?: Partial<Author> | null;
  onSubmit: (
    data: AuthorFormPayload,
    imageFile?: File | null,
    removeImage?: boolean
  ) => void | Promise<void>;
  onClose?: () => void;
  isSubmitting?: boolean;
  readOnly?: boolean;
}

function getInitialFormData(author?: Partial<Author> | null): AuthorFormState {
  return {
    name: author?.name ?? "",
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

export default function AuthorForm({
  author = null,
  onSubmit,
  onClose,
  isSubmitting = false,
  readOnly = false,
}: AuthorFormProps) {
  const isEdit = Boolean(author?.ID);

  const [formData, setFormData] = useState<AuthorFormState>(() =>
    getInitialFormData(author)
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(author?.avatar ?? "");
  const [removedExistingImage, setRemovedExistingImage] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const isSaving = isSubmitting || isProcessingImage;

  useEffect(() => {
    setFormData(getInitialFormData(author));
    setPreviewUrl(author?.avatar ?? "");
    setImageFile(null);
    setRemovedExistingImage(false);
  }, [author]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const setField = <K extends keyof AuthorFormState>(
    key: K,
    value: AuthorFormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Author name is required";
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
        toast.error(
          "Compressed image is still too large. Please choose a smaller image."
        );
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

    await onSubmit(
      {
        name: formData.name.trim(),
      },
      imageFile,
      removedExistingImage
    );
  };

  return (
    <div className="space-y-4 p-2">
      <Field label="Author Name *">
        <Input
          value={formData.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="Enter author name"
          disabled={readOnly || isSaving}
        />
      </Field>

      <Field label="Avatar">
        <div className="space-y-3">
          {previewUrl ? (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border bg-gray-100">
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
            <div className="w-32 h-32 rounded-full border border-dashed flex items-center justify-center text-sm text-gray-500 bg-gray-50">
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