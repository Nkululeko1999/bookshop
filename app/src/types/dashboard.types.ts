export type DashboardStats = {
  totalBooks: number;
  totalOrders: number;
  totalRevenue: number;
};

export type LowStockBook = {
  ID: string;
  title: string;
  stock: number;
  price: number;
  author: string;
  genre: string;
  currency: string;
};

export type RecentOrder = {
  ID: string;
  createdAt: string;
  total: number;
  customer: string;
  itemCount: number;
};

export type TopSellingBook = {
  ID: string;
  title: string;
  totalSold: number;
  revenue: number;
  stock: number;
};

export type DashboardData = {
  stats: DashboardStats;
  lowStockBooks: LowStockBook[];
  recentOrders: RecentOrder[];
  topSellingBooks: TopSellingBook[];
};