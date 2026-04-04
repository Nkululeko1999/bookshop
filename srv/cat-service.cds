using { sap.capire.bookshop as shop } from '../db/schema';

service CatalogService @(odata: '/browse') {
  @readonly entity Books as projection on shop.Books {
    *,
    author.name as author,
    genre.name as genre,
  } excluding { createdBy, modifiedBy };
}