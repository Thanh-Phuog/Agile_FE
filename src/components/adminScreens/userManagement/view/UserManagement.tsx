"use client";
import React from "react";
import { Button, Divider, Form } from "antd";
import UserTable from "../components/UsersTable";
import useUserManagementViewModel from "../viewModel/UserManagementViewModel";
import UserModal from "../components/UsersModal";

const UserManagementScreen: React.FC = () => {
  const [form] = Form.useForm();
  const {
    users,
    isUserModalVisible,
    editingUser,
    loadingUsers,
    currentPage,
    pageSize,
    totalUsers,
    fetchUsers,
    handlePageChange,
    showAddUserModal,
    showEditUserModal,
    handleUserModalClose,
    handleAddOrUpdateUser,
  } = useUserManagementViewModel(form);

  React.useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
      </div>
      <Divider />

      <UserTable
        users={users}
        loading={loadingUsers}
        currentPage={currentPage}
        pageSize={pageSize}
        total={totalUsers}
        onEdit={showEditUserModal}
        onAddUser={showAddUserModal}
        onPageChange={handlePageChange}
      />

      <UserModal
        form={form}
        isUserModalVisible={isUserModalVisible}
        editingUser={editingUser}
        handleUserModalClose={handleUserModalClose}
        handleAddOrUpdateUser={handleAddOrUpdateUser}
      />
    </div>
  );
};

export default UserManagementScreen;
