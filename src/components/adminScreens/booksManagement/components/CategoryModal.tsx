import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space, message } from 'antd';
import type { FormInstance } from 'antd';
import type { CategoryModel } from '@/api/features/category/model/CategoryModel';

interface CategoryModalProps {
  form: FormInstance;
  isCategoryModalVisible: boolean;
  editingCategory: CategoryModel | null;
  handleCategoryCancel: () => void;
  handleAddOrUpdateCategory: (values: CategoryModel) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  form,
  isCategoryModalVisible,
  editingCategory,
  handleCategoryCancel,
  handleAddOrUpdateCategory,
}) => {
  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue({
        name: editingCategory.name || '',
        description: editingCategory.description || '',
      });
    } else {
      form.resetFields();
    }
  }, [editingCategory, form]);

  return (
    <Modal
      title={editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
      open={isCategoryModalVisible}
      onCancel={handleCategoryCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddOrUpdateCategory}
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
          initialValue=""
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          initialValue=""
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item className="text-right">
          <Space>
            <Button onClick={handleCategoryCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              {editingCategory ? 'Lưu thay đổi' : 'Thêm danh mục'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;