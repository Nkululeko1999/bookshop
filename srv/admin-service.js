module.exports = class AdminService extends cds.ApplicationService {
  async init() {
    const { Books, Orders } = this.entities;
    const db = await cds.connect.to("db");

    this.before("CREATE", "Orders", (req) => {
      const items = req.data.items || [];

      req.data.total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    });

    // Fetching Dashboard Data
    this.on("getDashboard", async (req) => {
      const lowStockThreshold = 5;

      const totalBooksResult = await SELECT.one.from(Books)
        .columns`count(*) as count`;

      const totalOrdersResult = await SELECT.one.from(Orders)
        .columns`count(*) as count`;

      const totalRevenueRows = await SELECT.from(Orders).columns("total");

      const totalRevenue = totalRevenueRows.reduce(
        (sum, row) => sum + Number(row.total || 0),
        0,
      );

      const lowStockBooksRaw = await SELECT.from(Books)
        .columns(
          "ID",
          "title",
          "stock",
          "price",
          "currency_code as currency",
          "author.name as author",
          "genre.name as genre",
        )
        .where({ stock: { "<": lowStockThreshold } })
        .orderBy("stock asc");

      const lowStockBooks = lowStockBooksRaw.map((book) => ({
        ID: book.ID,
        title: book.title,
        stock: Number(book.stock || 0),
        price: Number(book.price || 0),
        author: book.author || "",
        genre: book.genre || "",
        currency: book.currency || "",
      }));

      const recentOrdersBase = await SELECT.from(Orders)
        .columns("ID", "createdAt", "total", "user.names as customer")
        .orderBy("createdAt desc")
        .limit(5);

      const recentOrders = await Promise.all(
        recentOrdersBase.map(async (order) => {
          const itemCountRow = await SELECT.one.from(
            "sap.capire.bookshop.OrderItems",
          ).columns`count(*) as count`.where({ order_ID: order.ID });

          return {
            ID: order.ID,
            createdAt: order.createdAt,
            total: Number(order.total || 0),
            customer: order.customer || "Unknown",
            itemCount: Number(itemCountRow?.count || 0),
          };
        }),
      );

      const topSellingRaw = await db.run(`
        SELECT
          oi.book_ID as ID,
          b.title as title,
          COALESCE(SUM(oi.quantity), 0) as "totalSold",
          COALESCE(SUM(oi.quantity * oi.price), 0) as revenue,
          b.stock as stock
        FROM sap_capire_bookshop_OrderItems oi
        JOIN sap_capire_bookshop_Books b
          ON b.ID = oi.book_ID
        GROUP BY oi.book_ID, b.title, b.stock
        ORDER BY "totalSold" DESC
        LIMIT 5
      `);

      const topSellingBooks = topSellingRaw.map((row) => ({
        ID: row.ID,
        title: row.title,
        totalSold: Number(row.totalSold || 0),
        revenue: Number(row.revenue || 0),
        stock: Number(row.stock || 0),
      }));

      return {
        stats: {
          totalBooks: Number(totalBooksResult?.count || 0),
          totalOrders: Number(totalOrdersResult?.count || 0),
          totalRevenue,
        },
        lowStockBooks,
        recentOrders,
        topSellingBooks,
      };
    });

    return super.init();
  }
};
