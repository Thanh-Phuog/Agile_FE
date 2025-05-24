export interface BookModel {
  name: string;
  id: string;
  author: string;
  price: number;
  category: {id: string; name: string};
  description: string;
  status: boolean;
  images: string[];
  totalAmount: number;
  soldAmount: number;
}

export interface BookModelRequest {
  id?: string;
  name: string;
  author: string;
  price: number;
  images: string[];
  description: string;
  categoryId: string;
  totalAmount: number;
  status: boolean;
}  