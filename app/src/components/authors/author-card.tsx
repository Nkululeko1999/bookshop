import { formatDate } from "@/utils/helper";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface AuthorCardProps {
  id: string;
  name: string;
  createdAt?: string | Date;
  imageUrl?: string;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onReplace: (id: string) => void;
  onDelete: (id: string) => void;
}

const AuthorCard = ({
  id,
  name,
  createdAt,
  imageUrl,
  onView,
  onEdit,
  onDelete,
}: AuthorCardProps) => {
  return (
    <Card
      onClick={() => onView(id)}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <CardContent className="">
        <div className="px-5 pb-5">
<div className="flex justify-center pt-6">
  <div className="h-24 w-24 overflow-hidden rounded-full bg-slate-100 shadow-md ring-2 ring-slate-100">
    <img
      src={imageUrl || "/images/avatar-default.png"}
      alt={name}
      className="h-full w-full object-cover"
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "/images/avatar-default.png";
      }}
    />
  </div>
</div>

          <div className="mt-4 text-center">
            <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
              {name}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Member since {formatDate(createdAt)}
            </p>
          </div>

          <div className="mt-5 flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                onView(id);
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="rounded-lg px-3"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorCard;