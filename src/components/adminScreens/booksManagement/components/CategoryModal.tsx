import React from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import type { Category } from '../viewModel/BooksManagementViewModel';

interface CategoryModalProps {
    form: any;
    isCategoryModalVisible: boolean;
    editingCategory: Category | null;
    handleCategoryCancel: () => void;
    handleAddOrUpdateCategory: (values: any) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    form,
    isCategoryModalVisible,
    editingCategory,
    handleCategoryCancel,
    handleAddOrUpdateCategory,
}) => {
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
                >
                    <Input />
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