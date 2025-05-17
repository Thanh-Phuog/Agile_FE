"use client";

import BookDetail from "@/components/screens/bookDetail/view/bookDetail";
import { useSearchParams } from "next/navigation";

const BookDetailContent = () => {
    const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  if (!bookId) {
    return <div className="text-center text-gray-500">Đang tải...</div>;
  }else {
    return <BookDetail bookId={bookId} />;
  }
}

const BookDetailPage = () => {

  return (
    <BookDetailContent />
  );
}
export default BookDetailPage;