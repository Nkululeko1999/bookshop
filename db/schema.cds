using { managed, sap, Currency } from '@sap/cds/common';
namespace sap.capire.bookshop;

entity Authors  :   managed {
    key ID  : Integer;
    name    : String;
    books   : Association to many Books on books.author = $self;
}

entity Books    :   managed {
    key ID  : Integer;
    title   : String;
    descr   : localized String;
    stock   : Integer;
    price   : Decimal;
    currency: Currency;
    author  : Association to Authors;
    genre   : Association to Genres;
}

entity Genres: sap.common.CodeList {
    key ID  : Integer;
    parent  : Association to Genres;
}