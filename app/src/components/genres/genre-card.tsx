import { Trash } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const GenreCard = ({
  id,
  name,
  showDelete,
  onDelete,
}: {
  id: number;
  name: string;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
}) => {
    console.log(showDelete);
    
  return (
    <Card className="p-4 relative shadow rounded  border hover:bg-gray-100 transition-all">
      <CardContent>
        <h3 className="text-base text-center font-medium">{name}</h3>
      </CardContent>

      {showDelete && onDelete && (
        <div className="absolute cursor-pointer top-1 right-1">
          <Trash className="text-red-700 w-5 h-5" onClick={() => onDelete(id)} />
        </div>
      )}
    </Card>
  );
};

export default GenreCard;
