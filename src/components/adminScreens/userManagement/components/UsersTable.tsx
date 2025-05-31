"use client";
import React from "react";
import { Table, Button, Pagination, Spin } from "antd";
import type { UserResponse } from "@/api/features/user/model/UserModel";

interface UserTableProps {
  users: UserResponse[];
  loading: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
  onAddUser: () => void; // thêm hàm gọi khi bấm nút thêm
  onEdit: (user: UserResponse) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  currentPage,
  pageSize,
  total,
  onAddUser,
  onEdit,
  onPageChange,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => formatDate(text),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: UserResponse) => (
        <Button type="link" onClick={() => onEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      {/* Nút Thêm người dùng */}
      <div className="mb-4 flex justify-end">
        <Button
          type="primary"
          onClick={onAddUser}
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-4 rounded"
        >
          Thêm người dùng
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={false}
          className="shadow-md rounded"
        />
        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
            showSizeChanger
            pageSizeOptions={["5", "10", "20"]}
          />
        </div>
      </Spin>
    </div>
  );
};

export default UserTable;
