import CurrencyGrid from "@/components/currencies/currency-grid";
import useCurrencies from "@/hooks/currencies/use-currencies";


const Currencies = () => {
  const { isPending, error, data } = useCurrencies("admin");

  if (isPending) return "Loading...";

  if (error) return `Failed to load currencies: ${error.message}`

  return (
    <div className="bg-white p-4 md:p-6 shadow rounded-sm">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-base font-medium">
          Showing {data?.value?.length ?? 0} of Currencies
        </h2>
      </div>
      <CurrencyGrid currencies={data?.value ?? []} />
    </div>
  );
};

export default Currencies;