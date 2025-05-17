import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload, Button, Space, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { BookModel } from '@/api/features/book/model/BookModel';
import useCategoryManagementViewModel from '../../categoryManagement/viewModel/CategoryManagamentViewModel';

interface BookModalProps {
  form: FormInstance;
  isBookModalVisible: boolean;
  editingBook: BookModel | null;
  handleBookCancel: () => void;
  handleAddOrUpdateBook: (values: any) => void;
}

const BookModal: React.FC<BookModalProps> = ({
  form,
  isBookModalVisible,
  editingBook,
  handleBookCancel,
  handleAddOrUpdateBook,
}) => {
  const {categories, handlePageChange} = useCategoryManagementViewModel(form);
  useEffect(() => {
    if (editingBook) {
      form.setFieldsValue({
        ...editingBook,
        status: editingBook.status ?? true,
        images: [], // Images should be handled manually when editing
      });
    } else {
      form.resetFields();
    }
  }, [editingBook, form]);

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
          totalAmount: 0,
          soldAmount: 0,
          status: true,
        }}
      >
        <Form.Item
          name="name"
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
          name="category"
          label="Danh mục"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
        >
          <Select placeholder="Chọn danh mục">
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
            parser={(value) => value!.replace(/(,*)/g, '')}
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
          name="totalAmount"
          label="Tồn kho"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="soldAmount"
          label="Đã bán"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng đã bán!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Trạng thái"
          valuePropName="checked"
        >
          <Switch checkedChildren="Còn bán" unCheckedChildren="Ngừng bán" />
        </Form.Item>
        <Form.Item
          name="images"
          label="Ảnh sách (Thumbnail & ảnh phụ)"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: !editingBook, message: 'Vui lòng tải lên ít nhất 1 ảnh!' }]}
        >
          <Upload listType="picture-card" multiple maxCount={5} beforeUpload={() => false}>
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
