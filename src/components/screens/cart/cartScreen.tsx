import { useEffect, useState } from "react";
import CartItem from "./component/cartItems";
import {
  Button,
  Modal,
  List,
  Typography,
  Space,
  Row,
  Col,
  Divider,
  Spin,
  Input,
} from "antd";
import { useAuth } from "@/context/auth/useAuth";
import useCartViewModel from "./viewModel/cartViewModel";
import { cartRepo } from "@/api/features/cart/CartRepo";
import useBillViewModel from "../bill/viewModel/billViewModel";
const { Title, Text } = Typography;

const Cart = () => {
  const { user } = useAuth();
  const {
    cartItems,
    loading,
    fetchCartItems,
    removeFromCart,
    updateQuantityLocal,
  } = useCartViewModel(cartRepo);

  const { loading: billLoading, payment } = useBillViewModel();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Thêm state lưu thông tin khách hàng trong modal
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  // Load giỏ hàng khi vào trang
  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCheckChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) return; // tránh số lượng âm hoặc 0
    updateQuantityLocal(id, quantity);
  };

  const selectedItems = cartItems.filter((item) =>
    selectedIds.includes(item.id!)
  );

  const totalSelected = selectedItems.reduce(
    (sum, item) => sum + (item.book?.price ?? 0) * item.quantity,
    0
  );

  const handleOpenModal = () => {
    if (selectedIds.length === 0) {
      return Modal.warning({
        title: "Vui lòng chọn ít nhất một sản phẩm để thanh toán",
      });
    }
    // Khởi tạo customerInfo khi mở modal để dữ liệu mới nhất
    setCustomerInfo({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Xử lý thay đổi input thông tin khách hàng
  const handleCustomerInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof customerInfo
  ) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>

      {loading ? (
        <Spin tip="Đang tải giỏ hàng..." />
      ) : cartItems.length === 0 ? (
        <p className="text-gray-500">Không có sản phẩm nào trong giỏ.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.bookId}
              item={item}
              checked={selectedIds.includes(item.id!)}
              onCheckChange={handleCheckChange}
              onRemove={removeFromCart}
              onChangeQuantity={handleQuantityChange}
            />
          ))}

          {selectedIds.length > 0 && (
            <div className="text-right mt-4">
              <p className="text-xl font-bold mb-2">
                Tổng cộng: {totalSelected.toLocaleString()} đ
              </p>
              <Button
                type="primary"
                size="large"
                className="rounded-lg"
                onClick={handleOpenModal}
              >
                Thanh toán
              </Button>
            </div>
          )}

          <Modal
            title={
              <Title level={4} className="m-0">
                Thanh toán đơn hàng
              </Title>
            }
            open={isModalOpen}
            onOk={async () => {
              if (billLoading) return;

              if (!customerInfo.name.trim()) {
                Modal.error({ title: "Vui lòng nhập họ tên." });
                return;
              }
              if (!customerInfo.email.trim()) {
                Modal.error({ title: "Vui lòng nhập email." });
                return;
              }
              if (!customerInfo.phone.trim()) {
                Modal.error({ title: "Vui lòng nhập số điện thoại." });
                return;
              }
              if (!customerInfo.address.trim()) {
                Modal.error({ title: "Vui lòng nhập địa chỉ." });
                return;
              }

              const success = await payment({ cartItems: selectedIds });

              if (success) {
                setSelectedIds([]);
                fetchCartItems();
                handleCloseModal();
              }
            }}
            onCancel={handleCloseModal}
            okText="Xác nhận"
            cancelText="Hủy"
            width={600}
            bodyStyle={{ padding: "24px 32px" }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div>
                <Title level={5}>Sản phẩm thanh toán</Title>
                <List
                  bordered
                  dataSource={selectedItems}
                  renderItem={(item) => (
                    <List.Item>
                      <Row style={{ width: "100%" }}>
                        <Col span={14}>
                          <Text strong>{item.book?.name}</Text>
                        </Col>
                        <Col span={5}>
                          <Text>x {item.quantity}</Text>
                        </Col>
                        <Col span={5} style={{ textAlign: "right" }}>
                          <Text>
                            {(
                              item.book?.price! * item.quantity
                            ).toLocaleString()}{" "}
                            đ
                          </Text>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
                <Divider />
                <Row justify="end" style={{ fontSize: 16, fontWeight: "bold" }}>
                  Tổng tiền:{" "}
                  {selectedItems
                    .reduce((sum, i) => sum + i.book?.price! * i.quantity, 0)
                    .toLocaleString()}{" "}
                  đ
                </Row>
              </div>

              <div>
                <Title level={5}>Thông tin khách hàng</Title>
                <Row gutter={[16, 8]}>
                  <Col span={12}>
                    <Text>
                      <b>Họ tên:</b>
                    </Text>
                    <Input
                      value={customerInfo.name}
                      onChange={(e) => handleCustomerInfoChange(e, "name")}
                      placeholder="Nhập họ tên"
                    />
                  </Col>
                  <Col span={12}>
                    <Text>
                      <b>Email:</b>
                    </Text>
                    <Input
                      value={customerInfo.email}
                      onChange={(e) => handleCustomerInfoChange(e, "email")}
                      placeholder="Nhập email"
                    />
                  </Col>
                  <Col span={12}>
                    <Text>
                      <b>Số điện thoại:</b>
                    </Text>
                    <Input
                      value={customerInfo.phone}
                      onChange={(e) => handleCustomerInfoChange(e, "phone")}
                      placeholder="Nhập số điện thoại"
                    />
                  </Col>
                  <Col span={24}>
                    <Text>
                      <b>Địa chỉ:</b>
                    </Text>
                    <Input
                      value={customerInfo.address}
                      onChange={(e) => handleCustomerInfoChange(e, "address")}
                      placeholder="Nhập địa chỉ"
                    />
                  </Col>
                </Row>
              </div>

              <div>
                <Title level={5}>Thông tin thanh toán (COD)</Title>
                <Text>
                  Quý khách vui lòng chuẩn bị tiền mặt đủ theo số tiền trên khi
                  nhận hàng. <br />
                  Nhân viên giao hàng sẽ thu tiền trực tiếp và giao hóa đơn cho
                  quý khách.
                </Text>
              </div>
            </Space>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Cart;
