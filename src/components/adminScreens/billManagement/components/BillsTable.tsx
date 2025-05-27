import React from 'react';
import { Table, Select } from 'antd';
import { Bill, BillStatus } from '@/api/features/bill/model/BillModel';

interface BillsTableProps {
  bills: Bill[];
  handleStatusChange: (id: string, status: BillStatus) => void;
  currentPage: number;
  pageSize: number;
  total: number;
  handlePageChange: (page: number, pageSize: number) => void;
}

const BillsTable: React.FC<BillsTableProps> = ({
  bills,
  handleStatusChange,
  currentPage,
  pageSize,
  total,
  handlePageChange,
}) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'cartItems',
      key: 'cartItems',
      render: (cartItems: string[]) => cartItems.join(', '),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: BillStatus, record: Bill) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          className="w-32"
        >
          <Select.Option value={BillStatus.PENDING}>Pending</Select.Option>
          <Select.Option value={BillStatus.PAID}>Paid</Select.Option>
          <Select.Option value={BillStatus.CANCELLED}>Cancelled</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={bills}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize,
        total,
        onChange: handlePageChange,
        showSizeChanger: true,
      }}
      title={() => <span>Danh sách đơn hàng</span>}
    />
  );
};

export default BillsTable;