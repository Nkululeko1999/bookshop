import CurrencyGrid from "@/components/currencies/currency-grid";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

const Currencies = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["currencies"],
        queryFn: () => fetch('/api/admin/Currencies').then((res) => res.json())
    });

    if (isPending) return "Loading...";

    if (error) return "Failed to load currencies: " + error.message;

  return (
    <div className="bg-white p-4 md:p-6 shadow rounded-md">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Available Currencies</h2>
        <Badge className="text-[14.5px] text-black font-medium p-3 bg-gray-200">
          Total: {data.value.length}
        </Badge>
      </div>
      <CurrencyGrid currencies={data.value} />
    </div>
  );
};

export default Currencies;
