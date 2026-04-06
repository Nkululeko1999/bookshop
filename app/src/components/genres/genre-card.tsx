import { Card, CardContent } from "../ui/card";

const GenreCard = ({ name }: { name: string }) => {
    return (
        <Card className="p-4 shadow rounded cursor-pointer border hover:bg-gray-100 transition-all">
            <CardContent>
                <h3 className="text-base text-center font-medium">{name}</h3>
            </CardContent>
        </Card>
    );
}

export default GenreCard;