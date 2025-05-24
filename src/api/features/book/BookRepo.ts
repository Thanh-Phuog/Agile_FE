import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { BookModel, BookModelRequest } from "./model/BookModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";
import { TransferToFormData } from "@/utils/helper/TransferToFormData";

interface IBookRepo {
    create(data: BookModelRequest): Promise<BaseApiResponseModel<BookModel>>;
    update(id: string, data: BookModelRequest): Promise<BaseApiResponseModel<BookModel>>;
    delete(id: string): Promise<BaseApiResponseModel<BookModel>>;
    getById(id: string): Promise<BaseApiResponseModel<BookModel>>;
    getList(data: Partial<BookModel>): Promise<BaseApiResponseModel<BookModel[]>>;
}

export class BookRepo implements IBookRepo {
    async create(data: BookModelRequest): Promise<BaseApiResponseModel<BookModel>> {
        // return client.post(ApiPath.BOOK_CREATE, data);
         const tranferedData = TransferToFormData(data);
    return client.post(ApiPath.BOOK_CREATE, tranferedData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    }
    async update(id: string, data: BookModelRequest): Promise<BaseApiResponseModel<BookModel>> {
        return client.put(ApiPath.BOOK_UPDATE + id, data);
    }
    async delete(id: string): Promise<BaseApiResponseModel<BookModel>> {
        return client.delete(ApiPath.BOOK_DELETE + id);
    }
    async getById(id: string): Promise<BaseApiResponseModel<BookModel>> {
        return client.get(ApiPath.BOOK_DETAIL + id);
    }
    async getList(data: Partial<BookModel> & { page: number; limit: number }): Promise<BaseApiResponseModel<BookModel[]>> {
        return client.get(ApiPath.BOOK_LIST, data);
    }
    async search(data: Partial<BookModel> & { page: number; limit: number; keyword?: string, fromPrice?: number, toPrice?: number }): Promise<BaseApiResponseModel<BookModel[]>> {
        return client.get(ApiPath.BOOK_LIST, data);
    }
}

