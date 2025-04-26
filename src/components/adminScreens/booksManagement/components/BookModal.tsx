import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { Book, Category } from '../viewModel/BooksManagementViewModel';

interface BookModalProps {
    form: any;
    categories: Category[];
    isBookModalVisible: boolean;
    editingBook: Book | null;
    handleBookCancel: () => void;
    handleAddOrUpdateBook: (values: any) => void;
}

const BookModal: React.FC<BookModalProps> = ({
    form,
    categories,
    isBookModalVisible,
    editingBook,
    handleBookCancel,
    handleAddOrUpdateBook,
}) => {
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <Modal
            title={editingBook ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
            open={isBookModalVisible}
            onCancel={handleBookCancel}
            footer={null}
            destroyOnClose
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleAddOrUpdateBook}
                initialValues={{
                    price: 0,
                    categories: [],
                }}
            >
                <Form.Item
                    name="title"
                    label="Tên sách"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="author"
                    label="Tác giả"
                    rules={[{ required: true, message: 'Vui lòng nhập tên tác giả!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="categories"
                    label="Danh mục"
                    rules={[{ required: true, message: 'Vui lòng chọn ít nhất một danh mục!' }]}
                >
                    <Select mode="multiple" placeholder="Chọn danh mục">
                        {categories.map((cat) => (
                            <Select.Option key={cat.id} value={cat.name}>
                                {cat.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Giá (VNĐ)"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sách!' }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: '100%' }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả sách!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="thumbnail"
                    label="Ảnh Thumbnail"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: !editingBook, message: 'Vui lòng tải lên ảnh thumbnail!' }]}
                >
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={() => false}
                    >
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Tải lên</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="additionalImages"
                    label="Ảnh phụ (Tối đa 4 ảnh)"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        listType="picture-card"
                        maxCount={4}
                        multiple
                        beforeUpload={() => false}
                    >
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Tải lên</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item className="text-right">
                    <Space>
                        <Button onClick={handleBookCancel}>Hủy</Button>
                        <Button type="primary" htmlType="submit">
                            {editingBook ? 'Lưu thay đổi' : 'Thêm sách'}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BookModal;