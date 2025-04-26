import type { Metadata } from "next";
import "./globals.css";
import '@ant-design/v5-patch-for-react-19';
import MainLayout from "@/components/common/MainLayout";
import { AuthProvider } from "@/context/auth/useAuth";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import useColor from "@/hooks/useColor";
import { App, ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: "Book Store",
  description: "A simple book store app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { brandPrimary } = useColor();
  return (
    <html lang="en">
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: { colorPrimary: brandPrimary },
            components: {
              Select: {
                optionSelectedColor: "#fff",
              },
            },
          }}
        >
          <AuthProvider>
            <body>
        {children}
            </body>
          </AuthProvider>
        </ConfigProvider>
      </AntdRegistry>
    </html>
  );
}
