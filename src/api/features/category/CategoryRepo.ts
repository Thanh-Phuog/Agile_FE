import { ApiPath } from "@/api/ApiPath";
import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import client from "@/api/client";
import { CategoryModel } from "./model/CategoryModel";

interface ICategoryRepo {
    getAll(): Promise<BaseApiResponseModel<CategoryModel>>;
    create(data: CategoryModel): Promise<BaseApiResponseModel<CategoryModel>>;
    update(id: string, data: CategoryModel): Promise<BaseApiResponseModel<CategoryModel>>;
    delete(id: string): Promise<BaseApiResponseModel<CategoryModel>>;
    getById(id: string): Promise<BaseApiResponseModel<CategoryModel>>;
    getList(data: Partial<CategoryModel>): Promise<BaseApiResponseModel<CategoryModel>>;
}

export class CategoryRepo implements ICategoryRepo {
    async getAll(): Promise<BaseApiResponseModel<CategoryModel>> {
        return client.get(ApiPath.CATEGORY_ALL);
    }
    async create(data: CategoryModel): Promise<BaseApiResponseModel<CategoryModel>> {
        return client.post(ApiPath.CATEGORY_CREATE, data);
    }
    async update(id: string, data: CategoryModel): Promise<BaseApiResponseModel<CategoryModel>> {
        return client.put(ApiPath.CATEGORY_UPDATE + id, data);
    }
    async delete(id: string): Promise<BaseApiResponseModel<CategoryModel>> {
        return client.delete(ApiPath.CATEGORY_DELETE + id);
    }
    async getById(id: string): Promise<BaseApiResponseModel<CategoryModel>> {
        return client.get(ApiPath.CATEGORY_DETAIL + id);
    }
    async getList(data: Partial<CategoryModel> & { page: number; limit: number }): Promise<BaseApiResponseModel<CategoryModel>> {
        return client.get(ApiPath.CATEGORY_LIST, data);
    }
}