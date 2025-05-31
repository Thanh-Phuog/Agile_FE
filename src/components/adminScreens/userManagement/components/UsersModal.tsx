"use client";
import React, { use, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import type { UserResponse } from "@/api/features/user/model/UserModel";

const { Option } = Select;

interface UserModalProps {
  form: any;
  isUserModalVisible: boolean;
  editingUser: UserResponse | null;
  handleUserModalClose: () => void;
  handleAddOrUpdateUser: (values: any) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  form,
  isUserModalVisible,
  editingUser,
  handleUserModalClose,
  handleAddOrUpdateUser,
}) => {
  const onFinish = (values: any) => {
    handleAddOrUpdateUser(values);
  };

  useEffect(() => {
    if (editingUser) {
      form.setFieldsValue({
        name: editingUser.name || "",
        email: editingUser.email || "",
        role: editingUser.role || "admin",
        phone: editingUser.phone || "",
        address: editingUser.address || "",
        status: editingUser.status || "active",
      });
    } else {
      form.resetFields();
    }
  }, [editingUser, form]);

  return (
    <Modal
      title={editingUser ? "Chỉnh sửa thông tin người dùng" : "Thêm người dùng mới"}
      open={isUserModalVisible}
      onCancel={handleUserModalClose}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input user name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input user email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input disabled={!!editingUser} />
        </Form.Item>
        {!editingUser && (
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password!" }]}
          >
            <Input.Password />
          </Form.Item>
        )}
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
          <Select>
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        {editingUser && (
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default UserModal;
