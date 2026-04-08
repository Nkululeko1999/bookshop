export interface Book {
  ID: number;
  title: string;
  author: { ID: number; name: string };
  genre: { ID: number; name: string };
  descr: string | null;
  price: number | null;
  stock: number;
  rating: number | null;
  type: string;
  pages: null;
  ISBN: null;
  imageUrl: null;
  imageID: null;
  createdAt: Date;
  modifiedAt?: Date;
  currency_code: string | null;
}
