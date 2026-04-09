import useDashboard from "@/api/dashboard/dashboard.hooks";
import StatCard from "@/components/dashboard/stat-card";
import { formatDate, formatPrice } from "@/utils/helper";

const Dashboard = () => {
  const { data, isPending, error } = useDashboard();

  if (isPending) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error || !data) {
    return (
      <div className="p-6 text-red-600">
        Failed to load dashboard data.
      </div>
    );
  }

  const { stats, lowStockBooks, recentOrders, topSellingBooks } = data;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-sm text-gray-500">Bookstore overview</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-3">
        <StatCard title="Total Books" value={stats.totalBooks} />
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Total Revenue" value={formatPrice(stats.totalRevenue)} />
      </div>

      <div className="rounded border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Low Stock Books</h2>
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
            {lowStockBooks.length} items
          </span>
        </div>

        {lowStockBooks.length === 0 ? (
          <p className="text-sm text-gray-500">No low stock books.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Genre</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {lowStockBooks.map((book) => (
                  <tr key={book.ID} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium text-gray-900">{book.title}</td>
                    <td className="px-4 py-3">{book.author}</td>
                    <td className="px-4 py-3">{book.genre}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">
                        {book.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {book.currency} {book.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Orders</h2>

          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500">No recent orders.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Items</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.ID} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium text-gray-900">{order.customer}</td>
                      <td className="px-4 py-3">{order.itemCount}</td>
                      <td className="px-4 py-3">{formatPrice(order.total)}</td>
                      <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Top Selling Books</h2>

          {topSellingBooks.length === 0 ? (
            <p className="text-sm text-gray-500">No sales data yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Sold</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Stock Left</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellingBooks.map((book) => (
                    <tr key={book.ID} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium text-gray-900">{book.title}</td>
                      <td className="px-4 py-3">{book.totalSold}</td>
                      <td className="px-4 py-3">{formatPrice(book.revenue)}</td>
                      <td className="px-4 py-3">{book.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;