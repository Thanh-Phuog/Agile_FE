import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { BookModel, BookModelRequest, BookModelUpdate } from "./model/BookModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";
import { TransferToFormData } from "@/utils/helper/TransferToFormData";

interface IBookRepo {
    create(data: BookModelRequest): Promise<BaseApiResponseModel<BookModel>>;
    update(id: string, data: BookModelUpdate): Promise<BaseApiResponseModel<BookModel>>;
    delete(id: string): Promise<BaseApiResponseModel<BookModel>>;
    getById(id: string): Promise<BaseApiResponseModel<BookModel>>;
    getList(data: { page: number; limit: number }): Promise<BaseApiResponseModel<BookModel[]>>;
    search(data: { page: number; limit: number; search?: string; fromPrice?: number; toPrice?: number }): Promise<BaseApiResponseModel<BookModel[]>>;
}

export class BookRepo implements IBookRepo {
    async create(data: BookModelRequest): Promise<BaseApiResponseModel<BookModel>> {
        // return client.post(ApiPath.BOOK_CREATE, data);
         const tranferedData = TransferToFormData(data);
    return client.post(ApiPath.BOOK_CREATE, tranferedData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    }
    async update(id: string, data: BookModelUpdate): Promise<BaseApiResponseModel<BookModel>> {
        const tranferedData = TransferToFormData(data);
    return client.put(ApiPath.BOOK_UPDATE + id, tranferedData);
    }
    async delete(id: string): Promise<BaseApiResponseModel<BookModel>> {
        return client.delete(ApiPath.BOOK_DELETE + id);
    }
    async getById(id: string): Promise<BaseApiResponseModel<BookModel>> {
        return client.get(ApiPath.BOOK_DETAIL + id);
    }
    async getList(data: { page: number; limit: number }): Promise<BaseApiResponseModel<BookModel[]>> {
        return client.get(ApiPath.BOOK_LIST, data);
    }
    async search(data:{ page: number; limit: number; search?: string, fromPrice?: number, toPrice?: number,  categoryIds?: string }): Promise<BaseApiResponseModel<BookModel[]>> {
        return client.get(ApiPath.BOOK_LIST, data);
    }
}

