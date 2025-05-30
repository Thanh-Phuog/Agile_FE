"use client";

import { Card, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/auth/useAuth";
import { useRouter } from "next/navigation";
import { BookModel } from "@/api/features/book/model/BookModel";
import useCartViewModel from "@/components/screens/cart/viewModel/cartViewModel";
import { cartRepo } from "@/api/features/cart/CartRepo";

const { Meta } = Card;

interface Props {
  product: BookModel;
}

const ProductBook = ({ product }: Props) => {

    const {user} = useAuth();
    const router = useRouter();
    const { addToCart } = useCartViewModel(cartRepo);

const handleAddToCart = async () => {
  if (!user) {
    router.push("/login");
    message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
    return;
  }

  try {
    await addToCart({
      bookId: product.id,
      quantity: 1, // UI quyết định số lượng
    });
    message.success("Sản phẩm đã được thêm vào giỏ hàng!");
  } catch (err) {
    message.error("Thêm sản phẩm thất bại!");
    console.error("Add to cart error:", err);
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
            onClick={handleAddToCart}
          >
            Thêm vào giỏ
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductBook;