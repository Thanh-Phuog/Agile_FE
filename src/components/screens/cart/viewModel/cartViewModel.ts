import { CartRepo } from "@/api/features/cart/CartRepo";
import { CartModel, CartRequest } from "@/api/features/cart/model/CartModel";
import { useEffect, useState } from "react";


const useCartViewModel = (cartRepo: CartRepo) => {
  const [cartItems, setCartItems] = useState<CartModel[]>([]);
  const [loading, setLoading] = useState(false);
  // Bộ nhớ đệm số lượng chưa cập nhật lên server
  const [bufferedQuantities, setBufferedQuantities] = useState<Record<string, number>>({});

  // Lấy danh sách giỏ hàng (GET)
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await cartRepo.getCartItems();
      if (!response.error) {
        setCartItems(response.data || []);
      } else {
        console.error("❌ Lỗi khi lấy danh sách giỏ hàng:", response.error);
      }
    } catch (error) {
      console.error("❌ Lỗi hệ thống khi lấy danh sách giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Thêm sản phẩm vào giỏ hàng (ADD)
  const addToCart = async (item: CartRequest) => {
    try {
      setLoading(true);
      const response = await cartRepo.addToCart(item);
      if (!response.error) {
        // Thêm mới vào cartItems
        setCartItems((prev) => [...prev, response.data]);
      } else {
        console.error("❌ Lỗi khi thêm sản phẩm vào giỏ hàng:", response.error);
      }
    } catch (error) {
      console.error("❌ Lỗi hệ thống khi thêm sản phẩm vào giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng (DELETE)
  const removeFromCart = async (id: string) => {
    try {
      setLoading(true);
      const response = await cartRepo.removeFromCart(id);
      if (!response.error) {
        fetchCartItems(); // Cập nhật lại danh sách giỏ hàng sau khi xóa
        // setCartItems((prev) => prev.filter((item) => item.bookId !== id));
        // console.log("✅ Đã xóa sản phẩm khỏi giỏ hàng:", id);
        
      } else {
        console.error("❌ Lỗi khi xóa sản phẩm khỏi giỏ hàng:", response.error);
      }
    } catch (error) {
      console.error("❌ Lỗi hệ thống khi xóa sản phẩm khỏi giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật số lượng tạm thời trong bộ nhớ đệm (không gọi API ngay)
  const updateQuantityLocal = (bookId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.bookId === bookId ? { ...item, quantity: quantity } : item
      )
    );
    setBufferedQuantities((prev) => ({ ...prev, [bookId]: quantity }));
  };

//   // Khi thoát trang, gửi các cập nhật số lượng chưa lưu lên server (UPDATE)
//   useEffect(() => {
//     const handleBeforeUnload = async () => {
//       const updates = Object.entries(bufferedQuantities).map(([bookId, quantity]) =>
//         cartRepo.updateCartItem(bookId, { bookId, quantity })
//       );
//       try {
//         await Promise.all(updates);
//         console.log("✅ Đã cập nhật số lượng giỏ hàng lên server trước khi thoát trang.");
//       } catch (error) {
//         console.error("❌ Lỗi khi cập nhật số lượng giỏ hàng trước khi thoát trang:", error);
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       handleBeforeUnload();
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [bufferedQuantities]);

  return {
    cartItems,
    loading,
    fetchCartItems,
    addToCart,
    removeFromCart,
    updateQuantityLocal,
  };
};

export default useCartViewModel;
