"use client";

import { BookModel } from "@/api/features/book/model/BookModel";

import books from "../../bookData";
import SwiperBannerCard from "./component/swiperBanner";
import ProductBook from "@/components/common/book/book";
  

const ShopScreen = () => {
    return(
      <div>
        <SwiperBannerCard />
         <div className="flex flex-wrap justify-center p-4">

    {books.map((book) => (
      <ProductBook key={book.id} product={book} />
    ))}
  </div>
      </div>
   
);
};

export default ShopScreen;