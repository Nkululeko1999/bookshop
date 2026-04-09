export const getCurrencies = async (
  role: QueryRole,
  page: number,
  pageSize: number
) => {
  const skip = (page - 1) * pageSize;

  const params = new URLSearchParams({
    $top: String(pageSize),
    $skip: String(skip),
    $count: "true",
    $orderby: "code asc",
  });

  const query = params.toString().replace(/\+/g, "%20");

  const res = await fetch(`/api/${role}/Currencies?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch currencies");
  }

  return res.json();
};