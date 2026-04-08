using {
  Currency,
  managed,
  sap
} from '@sap/cds/common';

namespace sap.capire.bookshop;

entity Users : managed {
  key ID    : UUID;

      names  : String;
      email : String;
      password : String;
      avatar : String;
      avatarID : String;
}

entity Books : managed {
  key ID       : UUID;
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
  key ID       : UUID;
      name     : String;
      avatar   : String;
      avatarID : String;
      books    : Association to many Books
                   on books.author = $self;
}

entity Genres : sap.common.CodeList {
  key ID     : UUID;
      parent : Association to Genres;
}

entity Orders : managed {
  key ID    : UUID;

      user  : Association to Users;
      total : Decimal;

      items : Composition of many OrderItems
                on items.order = $self;
}

entity OrderItems : managed {
  key ID       : UUID;

      book     : Association to Books;
      quantity : Integer;
      price    : Decimal;

      order    : Association to Orders;
}
