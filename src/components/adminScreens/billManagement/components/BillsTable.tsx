import React, { useState } from 'react';
import { Table, Select, Modal, Descriptions, List, Image } from 'antd';
import { Bill, BillStatus } from '@/api/features/bill/model/BillModel';
import { InfoCircleOutlined } from '@ant-design/icons';

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
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const Status = {
    [BillStatus.PENDING]: 'Chờ xử lý',
    [BillStatus.PAID]: 'Đã thanh toán',
    [BillStatus.CANCELLED]: 'Đã huỷ',
  };

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
      render: (id: string, record: Bill) => (
       <div className="flex items-center gap-2">
      <span>{id}</span>
      <InfoCircleOutlined
        onClick={() => {
          setSelectedBill(record);
        }}
        title="Xem chi tiết"
        style={{ color: '#1890ff', cursor: 'pointer', fontSize: '16px' }}
      />
    </div>
      ),
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
    <>
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

      <Modal
        open={!!selectedBill}
        onOk={() => setSelectedBill(null)}
        title={`Chi tiết đơn hàng - ${selectedBill?.id}`}
        width={700}
      >
        {selectedBill && (
          <>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="ID đơn hàng">{selectedBill.id}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">{Status[selectedBill.status]}</Descriptions.Item>
              <Descriptions.Item label="Phương thức thanh toán">
                {selectedBill.paymentMethod}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng tiền">
                {selectedBill.totalPrice.toLocaleString('vi-VN')} ₫
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {new Date(selectedBill.createdAt).toLocaleString('vi-VN')}
              </Descriptions.Item>
            </Descriptions>

            <h3 className="mt-4 mb-2 font-semibold">Danh sách sản phẩm</h3>
            <List
              itemLayout="horizontal"
              dataSource={selectedBill.items}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Image
                        width={60}
                        src={item.book?.images?.[0]}
                        alt={item.book?.name}
                        preview={false}
                      />
                    }
                    title={item.book?.name}
                    description={
                      <>
                        <div>Tác giả: {item.book?.author}</div>
                        <div>Số lượng: {item.quantity}</div>
                        <div>Giá: {item.price.toLocaleString('vi-VN')} ₫</div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default BillsTable;
