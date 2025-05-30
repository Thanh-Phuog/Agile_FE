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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: BillStatus, record: Bill) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id!, value)}
          className="w-40"
        >
          <Select.Option value={BillStatus.PENDING}>Chờ xử lý</Select.Option>
          <Select.Option value={BillStatus.PAID}>Đã thanh toán</Select.Option>
          <Select.Option value={BillStatus.CANCELLED}>Đã huỷ</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
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
      title={() => <span className="text-lg font-semibold">Danh sách đơn hàng</span>}
    />
  );
};

export default BillsTable;
