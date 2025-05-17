"use client";
import { ApiPath } from "@/api/ApiPath";
import MainLayout from "@/components/common/MainLayout/MainLayout";
import MainLayoutAdmin from "@/components/common/MainLayoutAdmin/MainLayoutAdmin";
import { useAuth } from "@/context/auth/useAuth";
import { Button, message, notification, Skeleton } from "antd";
import { Suspense, useEffect, useState } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <Suspense fallback={<Skeleton paragraph={{ rows: 10 }} active />}>
      <MainLayoutAdmin>{children}</MainLayoutAdmin>
    </Suspense>
  );
}
