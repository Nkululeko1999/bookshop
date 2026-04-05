export interface Book {
  ID: number;
  title: string;
  author: string;
  genre: string;
  descr: string | null;
  price: number | null;
  stock: number;
  rating: number | null;
  createdAt: Date;
  modifiedAt: Date;
  currency_code: string | null;
}
