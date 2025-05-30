export enum BillStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

export interface CartItem {
  id: string;
}

export interface CreateBillRequest {
  cartItems: string[];
}

export interface UpdateBillStatusRequest {
  status: BillStatus;
}

export interface Bill {
 id ?: string;
  userId: string;
  totalPrice: number;
  status: BillStatus;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  items: [
    {
      id?: string;
      billId: string; 
      bookId: string;
      quantity: number;
      price: number;
      createdAt: string;
      updatedAt: string;
      book?: {
        id: string;
        name: string;
        author: string;
        price: number;
        images: string[];
      };
    }
  ]
}

// export interface BillListResponse {
//   bills: Bill;
//   total: number;
//   page: number;
//   limit: number;
// }

export interface GetBillsQuery {
  page?: number;
  limit?: number;
  status?: BillStatus;
  fromDate?: string;
  toDate?: string;
}