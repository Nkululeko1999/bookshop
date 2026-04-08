using {
  Currency,
  managed,
  sap
} from '@sap/cds/common';

namespace sap.capire.bookshop;

entity Users : managed {
  key ID    : Integer;

      names  : String;
      email : String;
      password : String;
      avatar : String;
      avatarID : String;
}

entity Books : managed {
  key ID       : Integer;
      title    : localized String;
      descr    : localized String;
      author   : Association to Authors;
      genre    : Association to Genres;
      stock    : Integer;
      price    : Decimal;
      rating   : Integer;
      type     : String;
      pages    : Integer;
      ISBN     : String;
      imageUrl : String;
      imageID  : String;
      currency : Currency;
}

entity Authors : managed {
  key ID       : Integer;
      name     : String;
      avatar   : String;
      avatarID : String;
      books    : Association to many Books
                   on books.author = $self;
}

entity Genres : sap.common.CodeList {
  key ID     : Integer;
      parent : Association to Genres;
}

entity Orders : managed {
  key ID    : Integer;

      user  : Association to Users;
      total : Decimal;

      items : Composition of many OrderItems
                on items.order = $self;
}

entity OrderItems : managed {
  key ID       : Integer;

      book     : Association to Books;
      quantity : Integer;
      price    : Decimal;

      order    : Association to Orders;
}
