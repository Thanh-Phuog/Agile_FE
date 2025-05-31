import React, { useRef, useState } from 'react';
import { Row, Col, Typography, Tag, Button, Image, Divider, Space, Form, message, InputNumber } from 'antd';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import useBooksManagementViewModel from '@/components/adminScreens/booksManagement/viewModel/BooksManagementViewModel';
import { useAuth } from '@/context/auth/useAuth';
import { useRouter } from 'next/navigation';
import { cartRepo } from '@/api/features/cart/CartRepo';
import useCartViewModel from '../../cart/viewModel/cartViewModel';

const { Title, Text, Paragraph } = Typography;

interface BookDetailProps {
  bookId?: string;
}
const BookDetail: React.FC<BookDetailProps> = ({ bookId }) => {
  const [form] = Form.useForm();
  const { book } = useBooksManagementViewModel(form);
  const books = book.find((b) => b.id === bookId);
  const swiperRef = useRef<SwiperClass | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartViewModel(cartRepo);

  if (!books) {
    return <div>Không tìm thấy sách</div>;
  }

  const { name, author, description, price, totalAmount, soldAmount, status, category, images, id } = books;

  // Số lượng còn lại
  const remaining = totalAmount - soldAmount;

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/login");
      message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    if (remaining <= 0) {
      message.error("Sản phẩm đã hết hàng!");
      return;
    }

    try {
      await addToCart({
        bookId: id,
        quantity: quantity,
      });
      message.success("Đã thêm sách vào giỏ hàng!");
    } catch (error) {
      message.error("Không thể thêm sách vào giỏ hàng!");
    }
  };

  return (
    <div className='xl:px-32 px-5 pt-5'>
      <Row gutter={[32, 32]} align="top">
        {/* Hình ảnh - chiếm 1/3 */}
        <Col xs={24} md={8}>
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            style={{
              width: '100%',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img}
                  alt={`${name} - ảnh ${index + 1}`}
                  preview={false}
                  width="100%"
                  style={{ objectFit: 'contain', borderRadius: 8 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              paddingBottom: 4,
              marginTop: 12,
            }}
          >
            {images.map((img, index) => (
              <Image
                key={index}
                width={64}
                src={img}
                alt={`Ảnh ${index + 1}`}
                preview={false}
                onClick={() => swiperRef.current?.slideTo(index)}
                style={{
                  objectFit: 'cover',
                  borderRadius: 4,
                  cursor: 'pointer',
                  flex: '0 0 auto',
                  border: '2px solid transparent',
                }}
              />
            ))}
          </div>
        </Col>

        {/* Thông tin sách - chiếm 2/3 */}
        <Col xs={24} md={16}>
          <Title level={2} style={{ marginBottom: 0 }}>
            {name}
          </Title>
          <Text strong>Tác giả: {author}</Text>

          <Divider />

          <Paragraph>{description}</Paragraph>

          <Divider />

          <Title level={4} type="danger">
            Giá: {price.toLocaleString('vi-VN')} đ
          </Title>
          <Text>
            Số lượng còn lại: {remaining} / {totalAmount}
          </Text>
          <br />
          <Text>Đã bán: {soldAmount}</Text>
          <br />
          <Text>
            Trạng thái:{' '}
            <Tag color={remaining > 0 && status ? 'green' : 'default'}>
              {remaining > 0 && status ? 'Còn hàng' : 'Hết hàng'}
            </Tag>
          </Text>
          <br />
          <Text>
            Danh mục: <Tag color="blue">{category?.name}</Tag>
          </Text>

          <Divider />

          <Space direction="horizontal" style={{ marginBottom: 16 }}>
            <Text>Số lượng:</Text>
            <InputNumber
              min={1}
              max={remaining}
              value={quantity}
              onChange={(val) => setQuantity(val || 1)}
              disabled={remaining <= 0 || !status}
            />
          </Space>

          <br />

          <Button type="primary" disabled={remaining <= 0 || !status} onClick={handleAddToCart}>
            {remaining > 0 && status ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BookDetail;
