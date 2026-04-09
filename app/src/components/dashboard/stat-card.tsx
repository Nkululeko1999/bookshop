const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="rounded border bg-white p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
  </div>
);

export default StatCard;