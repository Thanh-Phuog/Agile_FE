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
  id: string;
  cartItems: string[];
  status: BillStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BillListResponse {
  bills: Bill[];
  total: number;
  page: number;
  limit: number;
}

export interface GetBillsQuery {
  page?: number;
  limit?: number;
  status?: BillStatus;
  fromDate?: string;
  toDate?: string;
}