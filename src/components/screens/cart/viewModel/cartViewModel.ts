import { CartRepo } from "@/api/features/cart/CartRepo";
import { CartModel, CartRequest } from "@/api/features/cart/model/CartModel";
import { useEffect, useState, useRef } from "react";

const LOCAL_STORAGE_KEY = "cart_buffered_quantities";

const useCartViewModel = (cartRepo: CartRepo) => {
  const [cartItems, setCartItems] = useState<CartModel[]>([]);
  const [loading, setLoading] = useState(false);
  // Lưu số lượng đệm theo bookId, đồng bộ với localStorage
  const [bufferedQuantities, setBufferedQuantities] = useState<Record<string, number>>({});

  // Ref để lưu debounce timers cho mỗi bookId
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // Load buffered quantities từ localStorage khi mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBufferedQuantities(parsed);
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  // Khi bufferedQuantities thay đổi, lưu lại localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bufferedQuantities));
  }, [bufferedQuantities]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await cartRepo.getCartItems();
      if (!response.error) {
        // Khi fetch về, nếu có bufferedQuantities cho item nào thì cập nhật số lượng UI
        const updatedItems = (response.data || []).map((item: CartModel) => {
          if (bufferedQuantities[item.bookId] !== undefined) {
            return { ...item, quantity: bufferedQuantities[item.bookId] };
          }
          return item;
        });
        setCartItems(updatedItems);
      } else {
        console.error("❌ Lỗi khi lấy danh sách giỏ hàng:", response.error);
      }
    } catch (error) {
      console.error("❌ Lỗi hệ thống khi lấy danh sách giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item: CartRequest) => {
    try {
      setLoading(true);
      const response = await cartRepo.addToCart(item);
      if (!response.error) {
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

  const removeFromCart = async (id: string) => {
    try {
      setLoading(true);
      const response = await cartRepo.removeFromCart(id);
      if (!response.error) {
        fetchCartItems();
        // Xóa buffered nếu có
        setBufferedQuantities((prev) => {
          const copy = { ...prev };
          delete copy[id];
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(copy));
          return copy;
        });
      } else {
        console.error("❌ Lỗi khi xóa sản phẩm khỏi giỏ hàng:", response.error);
      }
    } catch (error) {
      console.error("❌ Lỗi hệ thống khi xóa sản phẩm khỏi giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm gọi API cập nhật số lượng
  const updateQuantityApi = async (bookId: string, quantity: number) => {
    try {
      setLoading(true);
      const response = await cartRepo.updateCartItem(bookId, quantity);
      if (!response.error) {
        console.log(`✅ Đã cập nhật số lượng cho ${bookId}:`, quantity);
        // Xóa buffered khi đã update thành công
        setBufferedQuantities((prev) => {
          const copy = { ...prev };
          delete copy[bookId];
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(copy));
          return copy;
        });
        // Cập nhật lại cartItems sau khi update thành công
      fetchCartItems();

      } else {
        console.error("❌ Lỗi khi cập nhật số lượng:", response.error);
      }
    } catch (error) {
      console.error("❌ Lỗi hệ thống khi cập nhật số lượng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm update số lượng local + debounce gọi API update
  const updateQuantityLocal = (bookId: string, quantity: number) => {
    // Cập nhật số lượng trong cartItems (UI)
    setCartItems((prev) =>
      prev.map((item) =>
        item.bookId === bookId ? { ...item, quantity: quantity } : item
      )
    );

    // Cập nhật buffered quantities + localStorage
    setBufferedQuantities((prev) => ({ ...prev, [bookId]: quantity }));

    // Clear debounce cũ nếu có
    if (debounceTimers.current[bookId]) {
      clearTimeout(debounceTimers.current[bookId]);
    }

    // Đặt debounce mới 10s
    debounceTimers.current[bookId] = setTimeout(() => {
      updateQuantityApi(bookId, quantity);
      delete debounceTimers.current[bookId];
    }, 10000);
  };

  return {
    cartItems,
    loading,
    fetchCartItems,
    addToCart,
    removeFromCart,
    updateQuantityLocal,
    bufferedQuantities,
  };
};

export default useCartViewModel;
