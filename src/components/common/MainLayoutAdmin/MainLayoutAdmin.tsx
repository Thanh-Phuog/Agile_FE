"use client";

import React, { useState } from "react";
import { Layout, Menu, ConfigProvider, Dropdown, Button } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/context/auth/useAuth";
import useColor from "@/hooks/useColor";

const { Header, Content, Sider } = Layout;

const MainLayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { user, onLogout } = useAuth();
  const { backgroundColor, lightGray } = useColor();

  const isActived = (link: string) => pathname === link;

  const handleItemClick = (link: string) => {
    if (link === "/logout") {
      onLogout();
    } else {
      router.push(link);
    }
  };

  const adminNavItems = [
    { label: "Quản lý sách", link: "/admin/booksManagement" },
    { label: "Quản lý danh mục", link: "/admin/categoryManagement" },
    { label: "Quản lý đơn hàng", link: "/admin/billManagement" },
    { label: "Quản lý người dùng", link: "/admin/users" },
    { label: "Quay về trang web", link: "/", isBackToSite: true }, // mục cuối cùng
  ];

  const dropdownItems = [
    {
      key: "logout",
      label: <span onClick={onLogout}>Đăng xuất</span>,
    },
  ];

  return (
    <Layout>
      <ConfigProvider
        theme={{
          components: {
            Layout: { siderBg: "#fff" },
            Menu: {
              itemActiveBg: lightGray,
              itemSelectedBg: lightGray,
              colorBgContainer: "#fff",
              itemBorderRadius: 5,
            },
          },
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={250}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
          }}
        >
          <div className="p-4 text-2xl font-bold">📚 Quản trị</div>
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={adminNavItems.map((item) => ({
              key: item.link,
              label: (
                <div
                  className="px-4 flex items-center gap-2"
                  onClick={() => handleItemClick(item.link)}
                  style={{
                    color: item.isBackToSite ? "#1890ff" : undefined,
                    fontWeight: item.isBackToSite ? "600" : undefined,
                  }}
                >
                  {item.isBackToSite && <HomeOutlined />}
                  {item.label}
                </div>
              ),
              style: {
                boxShadow: isActived(item.link)
                  ? "0 2px 8px rgba(0,0,0,0.1)"
                  : "none",
              },
            }))}
          />
        </Sider>
      </ConfigProvider>

      <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Header
          style={{
            backgroundColor: backgroundColor,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            position: "sticky",
            top: 0,
            zIndex: 99,
          }}
        >
          <div className="flex items-center gap-3">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <h1 className="text-xl font-semibold">Hệ thống quản lý sách</h1>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
                <span className="cursor-pointer hover:text-blue-500 flex items-center gap-1">
                  Xin chào, {user.name} <DownOutlined />
                </span>
              </Dropdown>
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Đăng nhập
              </span>
            )}
          </div>
        </Header>

        <Content className="bg-white p-6 min-h-screen">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayoutAdmin;
