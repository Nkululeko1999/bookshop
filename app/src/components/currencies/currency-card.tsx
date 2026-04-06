import type { Currencies } from "@/types/currencies.types";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

interface CurrencyCardProps extends Currencies {
    icon?: React.ComponentType<{ className?: string }>;
}

const CurrencyCard = ({ icon: Icon, name, descr, code }: CurrencyCardProps) => {
    return (
        <Card className="relative h-full flex flex-col rounded border border-t-6 border-t-slate-800 shadow hover:shadow-lg transition-shadow p-6">
            <div className="absolute top-1 right-1">
                <Badge className="rounded bg-orange-600">{code}</Badge>
            </div>
            
            <div className="flex flex-col justify-center items-center text-center space-y-4">
                <div className="flex justify-center items-center">
                    {Icon && <Icon className="w-16 h-16 text-primary" />}
                </div>
                
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-sm text-muted-foreground">{descr}</p>
                </div>
            </div>
        </Card>
    );
};

export default CurrencyCard;