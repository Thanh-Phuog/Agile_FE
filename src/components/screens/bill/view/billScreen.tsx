'use client';
import React from 'react';
import { Divider, Table } from 'antd';
import useBillViewModel from '../viewModel/billViewModel';
import { Bill } from '@/api/features/bill/model/BillModel';

const BillScreen: React.FC = () => {
  const { bills, loading, fetchUserBills } = useBillViewModel();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Cart Items',
      dataIndex: 'cartItems',
      key: 'cartItems',
      render: (cartItems: string[]) => cartItems.join(', '),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
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