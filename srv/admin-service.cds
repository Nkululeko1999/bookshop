using { sap.capire.bookshop as shop } from '../db/schema';

service AdminService @(odata: '/admin') {
    entity Authors as projection on shop.Authors;
    entity Books as projection on shop.Books;
    entity Genres as projection on shop.Genres;
}