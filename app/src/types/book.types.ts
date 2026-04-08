export interface BookRef {
  ID: string;
  name: string;
}

export interface Book {
  ID: string;
  title: string;
  author: BookRef;   
  genre: BookRef;    
  descr: string | null;
  price: number | null;
  stock: number;
  rating: number | null;
  type: string;
  pages: number | null;
  ISBN: string | null;
  imageUrl: string | null;
  imageID: string | null;
  createdAt: Date;
  modifiedAt?: Date;
  currency_code: string | null;
}