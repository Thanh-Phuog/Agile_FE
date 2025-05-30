'use client';
import React from 'react';
import { Divider, Table, Tag } from 'antd';
import useBillViewModel from '../viewModel/billViewModel';
import { Bill, BillStatus } from '@/api/features/bill/model/BillModel';

const BillScreen: React.FC = () => {
  const { bills, loading } = useBillViewModel();

  const getStatusTag = (status: BillStatus) => {
    switch (status) {
      case BillStatus.PAID:
        return <Tag color="green">Đã thanh toán</Tag>;
      case BillStatus.PENDING:
        return <Tag color="blue">Chờ xử lý</Tag>;
      case BillStatus.CANCELLED:
        return <Tag color="red">Đã huỷ</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'items',
      key: 'items',
      render: (items: Bill['items']) =>
        items?.map((item) => item.book?.name).filter(Boolean).join(', ') || 'Không có',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (total: number) => `${total.toLocaleString()} đ`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: BillStatus) => getStatusTag(status),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Đơn hàng của tôi</h1>
      </div>
      <Divider />
      <Table
        columns={columns}
        dataSource={bills}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default BillScreen;
