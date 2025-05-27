import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { Bill, CreateBillRequest, UpdateBillStatusRequest, GetBillsQuery, BillListResponse } from "@/api/features/bill/model/BillModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";
import { TransferToFormData } from "@/utils/helper/TransferToFormData";

interface IBillRepo {
  create(data: CreateBillRequest): Promise<BaseApiResponseModel<Bill>>;
  getAll(data: GetBillsQuery): Promise<BaseApiResponseModel<BillListResponse>>;
  getUserBills(): Promise<BaseApiResponseModel<Bill[]>>;
  updateStatus(id: string, data: UpdateBillStatusRequest): Promise<BaseApiResponseModel<Bill>>;
}

export class BillRepo implements IBillRepo {
  async create(data: CreateBillRequest): Promise<BaseApiResponseModel<Bill>> {
    const transferredData = TransferToFormData(data);
    return client.post(ApiPath.BILL_CREATE, transferredData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async getAll(data: GetBillsQuery): Promise<BaseApiResponseModel<BillListResponse>> {
    return client.get(ApiPath.BILL_GET_ADMIN, { params: data });
  }

  async getUserBills(): Promise<BaseApiResponseModel<Bill[]>> {
    return client.get(ApiPath.BILL_GET_USER);
  }

  async updateStatus(id: string, data: UpdateBillStatusRequest): Promise<BaseApiResponseModel<Bill>> {
    return client.patch(`${ApiPath.BILL_PATCH}${id}/status`, data);
  }
}