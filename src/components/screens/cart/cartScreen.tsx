import { useEffect, useState } from "react";
import { BookModel } from "@/api/features/book/model/BookModel";
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
} from "antd";
import { useAuth } from "@/context/auth/useAuth";
const { Title, Text } = Typography;

const Cart = () => {
  const [cart, setCart] = useState<(BookModel & { quantity: number })[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Cập nhật cart trong state và localStorage
  const updateCart = (updatedCart: (BookModel & { quantity: number })[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleCheckChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleRemove = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateCart(newCart);
    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) return; // tránh số lượng âm hoặc 0
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    updateCart(newCart);
  };

  const selectedItems = cart.filter((item) => selectedIds.includes(item.id!));

  const totalSelected = selectedItems.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  const handleOpenModal = () => {
    if (selectedIds.length === 0) {
      return Modal.warning({
        title: "Vui lòng chọn ít nhất một sản phẩm để thanh toán",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Không có sản phẩm nào trong giỏ.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              checked={selectedIds.includes(item.id!)}
              onCheckChange={handleCheckChange}
              onRemove={handleRemove}
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
            visible={isModalOpen}
            onOk={() => {
              // Xử lý thanh toán thành công: xóa các sản phẩm được chọn khỏi giỏ hàng
              const newCart = cart.filter(
                (item) => !selectedIds.includes(item.id!)
              );
              updateCart(newCart);
              setSelectedIds([]);
              setIsModalOpen(false);
              Modal.success({ title: "Thanh toán thành công!" });
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
                          <Text strong>{item.name}</Text>
                        </Col>
                        <Col span={5}>
                          <Text>x {item.quantity}</Text>
                        </Col>
                        <Col span={5} style={{ textAlign: "right" }}>
                          <Text>
                            {(item.price! * item.quantity).toLocaleString()} đ
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
                    .reduce((sum, i) => sum + i.price! * i.quantity, 0)
                    .toLocaleString()}{" "}
                  đ
                </Row>
              </div>

              <div>
                <Title level={5}>Thông tin khách hàng</Title>
                <Row gutter={[16, 8]}>
                  <Col span={12}>
                    <Text>
                      <b>Họ tên:</b> {user?.name}
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text>
                      <b>Email:</b> {user?.email}
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text>
                      <b>Số điện thoại:</b> {user?.phone}
                    </Text>
                  </Col>
                  <Col span={24}>
                    <Text>
                      <b>Địa chỉ:</b> {user?.address || "Chưa cập nhật"}
                    </Text>
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
