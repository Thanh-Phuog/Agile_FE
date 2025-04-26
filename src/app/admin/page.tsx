"use client";

import { useAuth } from "@/context/auth/useAuth";
import { useRouter } from "next/navigation"; 
import { useEffect } from "react";

const AdminManagementPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/booksManagement"); 
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <img src="/image/logo.png" alt="Admin Management" />
    </div>
  );
};

export default AdminManagementPage;