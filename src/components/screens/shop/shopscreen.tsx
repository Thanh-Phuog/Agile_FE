"use client";

import { BookModel } from "@/api/features/authenticate/book/BookModel";
import ProductBook from "@/components/common/product";
import books from "../bookData";
import SwiperBannerCard from "./component/swiperBanner";
  

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