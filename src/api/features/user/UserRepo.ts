import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { UserRequest, UserResponse, UserUpdateRequest } from "./model/UserModel";
import { ApiPath } from "@/api/ApiPath";
import client from "@/api/client";
import { UserModel } from "../authenticate/model/LoginModel";

interface IUserRepo {
    getUsers(data: Partial<UserModel> & { page: number; limit: number }): Promise<BaseApiResponseModel<UserResponse[]>>;
    createUser(data: UserRequest): Promise<BaseApiResponseModel<UserResponse>>;
    updateUser(id: string, data: UserUpdateRequest): Promise<BaseApiResponseModel<UserResponse>>;
    }

export class UserRepo implements IUserRepo {
    async getUsers(data: Partial<UserModel> & { page: number; limit: number }): Promise<BaseApiResponseModel<UserResponse[]>> {
        return client.get(ApiPath.GET_USER, data);
    }
    async createUser(data: UserRequest): Promise<BaseApiResponseModel<UserResponse>> {
        return client.post(ApiPath.CREATE_USER, data);
    }
    async updateUser(id: string, data: UserUpdateRequest): Promise<BaseApiResponseModel<UserResponse>> {
        return client.put(ApiPath.UPDATE_USER + id, data);
    }
    }
export const userRepo = new UserRepo();