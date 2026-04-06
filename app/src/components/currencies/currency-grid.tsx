import type { Currencies } from "@/types/currencies.types";
import CurrencyCard from "./currency-card";

const CurrencyGrid = ({ currencies }: { currencies: Currencies[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {currencies.map((c: Currencies) => (
        <CurrencyCard name={c.name} descr={c.descr} code={c.code} />
      ))}
    </div>
  );
};

export default CurrencyGrid;
