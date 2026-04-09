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

export interface BrowseBook {
  ID: string;
  ISBN: string | null;
  type: string | null;
  descr: string | null;
  genre: string | null;
  pages: number | null;
  price: number | null;
  stock: number;
  title: string;
  author: string | null;
  rating: number | null;
  imageID: string | null;
  imageUrl: string | null;
  createdAt: string;
  modifiedAt?: string;
  currency_code: string | null;
}