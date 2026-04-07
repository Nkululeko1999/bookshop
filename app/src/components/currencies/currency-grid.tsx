import type { Currency } from "@/types/currencies.types";
import CurrencyCard from "./currency-card";

const CurrencyGrid = ({ currencies }: { currencies: Currency[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {currencies.map((c: Currency) => (
        <CurrencyCard key={c.ID} name={c.name} ID={c.ID} descr={c.descr} code={c.code} />
      ))}
    </div>
  );
};

export default CurrencyGrid;
