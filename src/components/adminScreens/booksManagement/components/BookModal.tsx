import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  Space,
  Switch,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd";
import { BookModel } from "@/api/features/book/model/BookModel";
import useCategoryManagementViewModel from "../../categoryManagement/viewModel/CategoryManagamentViewModel";

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
  const { categotiesSelected, fetchCategories, totalCategories, currentPage, loadingCategories } =
    useCategoryManagementViewModel(form);

  useEffect(() => {
    if (editingBook) {
      form.setFieldsValue({
        ...editingBook,
        category: editingBook.category?.id,
        status: editingBook.status ?? true,
        images:
          editingBook.images?.map((img, index) => ({
            uid: `${index}`,
            name: `Ảnh ${index + 1}`,
            status: "done",
            url: img,
          })) || [],
        newImages: [],
      });
    } else {
      form.resetFields();
    }
  }, [editingBook, form]);

  const normFile = (e: any) => (Array.isArray(e) ? e : e?.fileList);

const validateImages = (_: any, value: any) => {
  const images = form.getFieldValue("images") || [];
  const newImages = form.getFieldValue("newImages") || [];
  if (images.length + newImages.length === 0) {
    return Promise.reject(new Error("Vui lòng tải lên ít nhất 1 ảnh!"));
  }
  if (images.length + newImages.length > 5) {
    return Promise.reject(new Error("Tối đa 5 ảnh!"));
  }
  return Promise.resolve();
};



  const loadingRef = React.useRef(false);

const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  const target = e.currentTarget;
  if (
    target.scrollTop + target.clientHeight >= target.scrollHeight - 10 &&
    categotiesSelected.length < totalCategories &&
    !loadingRef.current
  ) {
    loadingRef.current = true;
    fetchCategories(currentPage + 1).finally(() => {
      loadingRef.current = false;
    });
  }
};

  return (
    <Modal
      title={editingBook ? "Chỉnh sửa sách" : "Thêm sách mới"}
      open={isBookModalVisible}
      onCancel={handleBookCancel}
      footer={null}
      destroyOnHidden
      centered
      width={900}
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên sách"
              rules={[{ required: true, message: "Vui lòng nhập tên sách!" }]}
            >
              <Input placeholder="VD: Dế Mèn Phiêu Lưu Ký" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="author"
              label="Tác giả"
              rules={[
                { required: true, message: "Vui lòng nhập tên tác giả!" },
              ]}
            >
              <Input placeholder="VD: Tô Hoài" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            >
             <Select
  placeholder="Chọn danh mục"
  onPopupScroll={handleScroll}
  loading={loadingCategories}
  virtual={false} // tắt ảo hóa để bắt sự kiện scroll dễ hơn
>
  {categotiesSelected.map((cat) => (
    <Select.Option key={cat.id} value={cat.id}>
      {cat.name}
    </Select.Option>
  ))}
</Select>

            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="price"
              label="Giá (VNĐ)"
              rules={[{ required: true, message: "Vui lòng nhập giá sách!" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="totalAmount"
              label="Tồn kho"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng tồn!" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="soldAmount"
              label="Đã bán"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng đã bán!" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả sách!" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Nhập mô tả chi tiết về sách..."
              />
            </Form.Item>
          </Col>
        </Row>

       <Row gutter={16}>
  {/* Ảnh cũ - chỉ hiển thị khi sửa */}
{editingBook && (
  <Col span={24}>
    <Form.Item
      name="images"
      label="Ảnh hiện tại"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload
        listType="picture-card"
        fileList={form.getFieldValue("images")}
        onChange={({ fileList }) => {
          form.setFieldsValue({ images: fileList });
        }}
        showUploadList={{ showRemoveIcon: true }}
        onRemove={(file) => {
          const currentImages = form.getFieldValue("images") || [];
          form.setFieldsValue({
            images: currentImages.filter((f: any) => f.uid !== file.uid),
          });
          return false;
        }}
      />
    </Form.Item>
  </Col>
)}


  <Col span={24}>
    <Form.Item
      name="newImages"
      label={editingBook ? "Thêm ảnh mới" : "Ảnh sách"}
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={[
        {
          validator: validateImages,
        },
      ]}
    >
      <Upload
        listType="picture-card"
        multiple
        maxCount={5}
        beforeUpload={() => false}
      >
        <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
      </Upload>
    </Form.Item>
  </Col>
</Row>


        <Row justify="space-between" align="middle">
          <Col>
            <Form.Item name="status" label="Trạng thái" valuePropName="checked">
              <Switch checkedChildren="Còn bán" unCheckedChildren="Ngừng bán" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Space>
                <Button onClick={handleBookCancel}>Hủy</Button>
                <Button type="primary" htmlType="submit">
                  {editingBook ? "Lưu thay đổi" : "Thêm sách"}
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default BookModal;
