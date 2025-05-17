import React, { useRef } from 'react';
import { Row, Col, Typography, Tag, Button, Image, Divider, Space } from 'antd';
import books from '@/components/bookData';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';

const { Title, Text, Paragraph } = Typography;

interface BookDetailProps {
  bookId?: string;
}
const BookDetail: React.FC<BookDetailProps> = ({ bookId }) => {
  const book = books.find((b) => b.id === bookId);
  const swiperRef = useRef<SwiperClass | null>(null);

  if (!book) {
    return <div>Không tìm thấy sách</div>;
  }

  const {
    name,
    id,
    author,
    price,
    category,
    description,
    status,
    images,
    totalAmount,
    soldAmount,
  } = book;

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
      Giá: {price.toLocaleString()} đ
    </Title>
    <Text>
      Số lượng còn lại: {totalAmount - soldAmount} / {totalAmount}
    </Text>
    <br />
    <Text>Đã bán: {soldAmount}</Text>
    <br />
    <Text>
      Trạng thái:{' '}
      <Tag color={status ? 'green' : 'default'}>
        {status ? 'Còn hàng' : 'Hết hàng'}
      </Tag>
    </Text>
    <br />
    <Text>
      Danh mục: <Tag color="blue">{category}</Tag>
    </Text>

    <Divider />

    <Button type="primary" disabled={!status}>
      {status ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
    </Button>
  </Col>
</Row>

    </div>
  );
};

export default BookDetail;
