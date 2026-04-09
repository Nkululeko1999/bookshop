import { useState } from "react";
import CurrencyGrid from "@/components/currencies/currency-grid";
import useCurrencies from "@/hooks/currencies/use-currencies";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 12;

const Currencies = () => {
  const [page, setPage] = useState(1);

  const { isPending, error, data, isFetching } = useCurrencies(
    "admin",
    page,
    PAGE_SIZE
  );

  const currencies = data?.value ?? [];
  const total = data?.["@odata.count"] ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (isPending) return "Loading...";
  if (error) return `Failed to load currencies: ${error.message}`;

  return (
    <div className="bg-white p-4 md:p-6 shadow rounded-sm">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-base font-medium">
          Showing {currencies.length} of {total} currencies
        </h2>
        {isFetching && <span className="text-sm">Updating...</span>}
      </div>

      <CurrencyGrid currencies={currencies} />

      <div className="mt-6 flex justify-center gap-3">
        <Button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <Button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Currencies;