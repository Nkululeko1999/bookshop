using {sap.capire.bookshop as shop} from '../db/schema';

service AdminService @(odata: '/admin') {
    entity Authors as projection on shop.Authors;
    entity Books   as projection on shop.Books;
    entity Genres  as projection on shop.Genres;
    entity Users   as projection on shop.Users;
    entity Orders  as projection on shop.Orders;

    action uploadBookImage(file: LargeString, bookId: UUID) returns {
        url      : String;
        publicId : String;
    };

    action deleteBookImage(bookId: UUID)  returns {
        success : Boolean;
    };

    action rateBook(bookId: UUID, rating: Integer) returns {
        message : String;
    };
}
