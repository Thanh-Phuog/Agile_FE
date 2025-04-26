import { useEffect, useState } from "react";
import books from "../bookData";
import { BookModel } from "@/api/features/authenticate/book/BookModel";
import CartItem from "./component/cartItems";
import { Button } from "antd";

const Cart = () => {
    const [cart, setCart] = useState<(BookModel & { quantity: number })[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }, []);
    
      const updateCart = (updatedCart: any[]) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
      };
      
      const handleRemove = (id: string) => {
        const newCart = cart.filter((item) => item.id !== id);
        updateCart(newCart);
      };

        
      const handleQuantityChange = (id: string, quantity: number) => {
        const newCart = cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        updateCart(newCart);
      };

    const total = cart.reduce((sum, item) => sum + item.price! * item.quantity, 0);
  return (
    <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>
    {cart.length === 0 ? (
      <p className="text-gray-500">Không có sản phẩm nào trong giỏ.</p>
    ) : (
      <>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={handleRemove}
            onChangeQuantity={handleQuantityChange}
          />
        ))}
        <div className="text-right mt-4">
          <p className="text-xl font-bold mb-2">Tổng cộng: ${total.toFixed(2)}</p>
          <Button type="primary" size="large" className="rounded-lg">
            Thanh toán
          </Button>
        </div>
      </>
    )}
  </div>
  );
}
export default Cart;