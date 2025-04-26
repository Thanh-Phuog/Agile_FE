"use client";

import { Card, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { BookModel } from "@/api/features/authenticate/book/BookModel";
import { useAuth } from "@/context/auth/useAuth";
import { useRouter } from "next/navigation";

const { Meta } = Card;

interface Props {
  product: BookModel;
}

const ProductBook = ({ product }: Props) => {

    const {user} = useAuth();
    const router = useRouter();

    const addToCart = () => {
        if (!user) {
             router.push("/login");
             message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            } else {
             // Add the product to the cart
       const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
         const updatedCart = [...existingCart, { ...product, quantity: 1 }];
         localStorage.setItem('cart', JSON.stringify(updatedCart));
         message.success("Sản phẩm đã được thêm vào giỏ hàng!");
        }
    }
  return (
    <div className="w-2xs m-4">
      <Card
        hoverable
        cover={
          <img
            alt={product.title}
            src={product.imageUrl}
            className="h-full w-64 object-cover rounded-t-lg"
          />
        }
        className="rounded-2xl shadow-md"
      >
        <Meta
          title={<h2 className="text-xl font-semibold">{product.title}</h2>}

        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-indigo-600">${product.price}</span>
          <Button 
            type="primary" 
            icon={<ShoppingCartOutlined />} 
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
            onClick={addToCart}
          >
            Thêm vào giỏ
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductBook;
