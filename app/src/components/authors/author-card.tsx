import { formatDate } from "@/utils/helper";
import { Card, CardContent } from "../ui/card";

interface AuthorCardProps {
    name: string;
    createdAt?: string | Date;
    imageUrl?: string;
}

const AuthorCard = ({ name, createdAt, imageUrl }: AuthorCardProps) => {
    return (
        <Card className="p-4 shadow rounded cursor-pointer border hover:bg-gray-100 transition-all">
            <CardContent className="p-0">
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                        <img 
                            src={imageUrl || "/images/avatar-default.png"} 
                            alt={name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/avatar-default.png";
                            }}
                        />
                    </div>
                    
                    <h3 className="text-base font-medium text-center">{name}</h3>
                    
                    <p className="text-xs text-gray-500 text-center">
                        Member since: {formatDate(createdAt)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default AuthorCard;