"use client";

import { useAuth } from "@/context/auth/useAuth";
import SwiperCard from "../component/swiper"; 

const Home = () => {
  const { user } = useAuth(); 

  return (
    <div className="flex flex-col px-12 items-center min-h-screen bg-gray-100">
      <SwiperCard />
    </div>
  );
};

export default Home;