export interface CreateOrderPayload {
  user_ID: string;
  total: number;
  items: {
    book_ID: string;
    quantity: number;
    price: number;
  }[];
}