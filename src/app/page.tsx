"use client";

import { useAuth } from "@/context/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <img src="/image/logo.png" alt="Book Store" />
    </div>
  );
};

export default Page;