import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { CartModel, CartRequest, CartResponse } from "./model/CartModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";

interface ICartRepo {
    addToCart(data: CartRequest): Promise<BaseApiResponseModel<CartResponse>>;
    updateCartItem(id: string, quantity: number): Promise<BaseApiResponseModel<any>>;
    removeFromCart(id: string): Promise<BaseApiResponseModel<any>>;
    getCartItems(): Promise<BaseApiResponseModel<CartModel[]>>;
    }

export class CartRepo implements ICartRepo {
    async addToCart(data: CartRequest): Promise<BaseApiResponseModel<CartResponse>> {
        return client.post(ApiPath.CART_ADD, data);
    }

    async updateCartItem(id: string, quantity: number): Promise<BaseApiResponseModel<any>> {
        return client.put(ApiPath.CART_UPDATE + id, { quantity });
    }

    async removeFromCart(id: string): Promise<BaseApiResponseModel<any>> {
        return client.delete(ApiPath.CART_DELETE + id);
    }

    async getCartItems(): Promise<BaseApiResponseModel<CartModel[]>> {
        return client.get(ApiPath.CART_GET);
    }
}

export const cartRepo = new CartRepo();