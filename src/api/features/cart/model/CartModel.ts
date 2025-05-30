export interface CartRequest {
  bookId?: string;
  quantity?: number;
}

export interface CartResponse {
  id: string;
  userId: string;
  bookId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartModel {
  id: string;
  userId: string;
  bookId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  book?: {
    id: string;
    name: string;
    images: string[];
    author: string;
    price: number;
  };
}
