import { BookRepo } from "@/api/features/book/BookRepo";
import { BookModel } from "@/api/features/book/model/BookModel";
import { useState, useEffect } from "react";

const bookRepo = new BookRepo();

type Filters = {
  keyword: string;
  categories: string;
  fromPrice: number;
  toPrice: number;
};

const useShopViewModel = () => {
  const [shop, setShop] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    categories: "",
    fromPrice: 0,
    toPrice: 1000000,
  });

  const fetchShop = async (filterParams = filters) => {
    try {
      setLoading(true);
      setError(null);

      // Chuẩn bị params cho API (bạn có thể parse categories nếu API cần array)
      const response = await bookRepo.search({
        page,
        limit: 100,
        search: filterParams.keyword,
        fromPrice: filterParams.fromPrice,
        toPrice: filterParams.toPrice,
        categoryIds: filterParams.categories
      });

      setShop(response.data || []);
      setTotal(response.paging?.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      console.error("Error fetching shop data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Tự động gọi fetch khi page hoặc filters thay đổi
  useEffect(() => {
    fetchShop(filters);
  }, [page, filters]);

  return {
    shop,
    loading,
    error,
    page,
    total,
    setPage,
    filters,
    setFilters,
    fetchShop,
  };
};

export default useShopViewModel;
