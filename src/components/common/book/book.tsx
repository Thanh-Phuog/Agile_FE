"use client";

import { Card, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/auth/useAuth";
import { useRouter } from "next/navigation";
import { BookModel } from "@/api/features/book/model/BookModel";

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
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    const index = existingCart.findIndex((item: any) => item.id === product.id);

    if (index !== -1) {
      // Nếu đã có sản phẩm -> tăng số lượng
      existingCart[index].quantity += 1;
    } else {
      // Nếu chưa có -> thêm mới với quantity = 1
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    message.success("Sản phẩm đã được thêm vào giỏ hàng!");
  }
};

  return (
    <div className="w-2xs m-4">
      <Card
        hoverable
        cover={
          <img
            alt={product.name}
            src={product.images[0]}
            className="h-[400px] w-64 object-cover rounded-t-lg"
          />
        }
        className="rounded-2xl shadow-md"
      >
        <div onClick={
          () => {
            router.push(`/bookDetail?bookId=${product.id}`);
          }
        }>

        <Meta
          title={<h2 className="text-xl font-semibold">{product.name}</h2>}

        />
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-indigo-600"> {product.price.toLocaleString()} đ</span>
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