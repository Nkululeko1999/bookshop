using {sap.capire.bookshop as shop} from '../db/schema';

service AdminService @(odata: '/admin') {
    entity Authors as projection on shop.Authors;
    entity Books   as projection on shop.Books;
    entity Genres  as projection on shop.Genres;
    entity Users   as projection on shop.Users;
    entity Orders  as projection on shop.Orders;

    type DashboardStat {
        totalBooks   : Integer;
        totalOrders  : Integer;
        totalRevenue : Decimal(15, 2);
    }

    type LowStockBook {
        ID       : UUID;
        title    : String;
        stock    : Integer;
        price    : Decimal(15, 2);
        author   : String;
        genre    : String;
        currency : String;
    }

    type RecentOrder {
        ID        : UUID;
        createdAt : Timestamp;
        total     : Decimal(15, 2);
        customer  : String;
        itemCount : Integer;
    }

    type TopSellingBook {
        ID        : UUID;
        title     : String;
        totalSold : Integer;
        revenue   : Decimal(15, 2);
        stock     : Integer;
    }

    type DashboardData {
        stats           : DashboardStat;
        lowStockBooks   : many LowStockBook;
        recentOrders    : many RecentOrder;
        topSellingBooks : many TopSellingBook;
    }

    action getDashboard() returns DashboardData;
}
