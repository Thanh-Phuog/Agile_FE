export interface BookModel {
  name: string;
  id: string;
  author: string;
  price: number;
  category: string;
  description: string;
  status: boolean;
  images: string[];
  totalAmount: number;
  soldAmount: number;
}
