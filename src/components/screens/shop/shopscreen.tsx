"use client";

import { useState } from "react";
import { Form, Input, Button, Row, Col, Slider, Typography } from "antd";
import SwiperBannerCard from "./component/swiperBanner";
import ProductBook from "@/components/common/book/book";
import useShopViewModel from "./viewModel/shopViewModel";

const { Text } = Typography;

const ShopScreen = () => {
  const [form] = Form.useForm();

  const { shop, loading, error, setFilters, filters } = useShopViewModel();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.fromPrice,
    filters.toPrice,
  ]);

  const onFinish = (values: any) => {
    const keyword = values.keyword?.trim() || "";
    const categories = values.categories?.trim() || "";
    const fromPrice = priceRange[0];
    const toPrice = priceRange[1];

    // Cập nhật filters => ViewModel sẽ tự gọi API qua useEffect
    setFilters({ keyword, categories, fromPrice, toPrice });
  };

  const onPriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <div>
      <SwiperBannerCard />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="p-6 max-w-5xl mx-auto"
        autoComplete="off"
        initialValues={{
          keyword: filters.keyword,
          categories: filters.categories,
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              label="Từ khóa (tên sách hoặc tác giả)"
              name="keyword"
              style={{ marginBottom: 0 }}
            >
              <Input placeholder="Nhập tên sách hoặc tác giả" allowClear />
            </Form.Item>
          </Col>

          {/* <Col xs={24} sm={12} md={6}>
            <Form.Item
              label="Danh mục (ID, cách nhau dấu phẩy)"
              name="categories"
              style={{ marginBottom: 0 }}
            >
              <Input placeholder="VD: 1,2,3" allowClear />
            </Form.Item>
          </Col> */}

          <Col xs={24} sm={24} md={8}>
            <Form.Item
              label={
                <span>
                  Giá từ <Text strong>{priceRange[0].toLocaleString()}</Text> đến{" "}
                  <Text strong>{priceRange[1].toLocaleString()}</Text> VNĐ
                </span>
              }
              style={{ marginBottom: 0 }}
            >
              <Slider
                range
                min={0}
                max={1000000}
                step={10000}
                value={priceRange}
                onChange={onPriceChange}
                tooltip={{ formatter: (value) => `${value?.toLocaleString()} VNĐ` }}
              />
            </Form.Item>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={4}
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="middle"
                block
                loading={loading}
              >
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div className="flex flex-wrap justify-center p-4 max-w-5xl mx-auto">
        {error && (
          <p className="text-center w-full text-red-500">
            Lỗi tải sách: {error.message}
          </p>
        )}
        {!error && shop.length === 0 && (
          <p className="text-center w-full">Không tìm thấy sách phù hợp.</p>
        )}
        {!error &&
          shop.map((bookItem) => (
            <ProductBook key={bookItem.id} product={bookItem} />
          ))}
      </div>
    </div>
  );
};

export default ShopScreen;
