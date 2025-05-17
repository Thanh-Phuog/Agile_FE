import React from 'react';
import { Table, Button, Space, Image, Tag, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { BookModel } from '@/api/features/book/model/BookModel';
import books from '@/components/bookData';

interface BooksTableProps {
  showAddBookModal: () => void;
  showEditBookModal: (book: BookModel) => void;
  handleDeleteBook: (id: string) => void;
}

const BooksTable: React.FC<BooksTableProps> = ({
  showAddBookModal,
  showEditBookModal,
  handleDeleteBook,
}) => {
  const [book, setBook] = React.useState<BookModel[]>(books)
  const columns: ColumnsType<BookModel> = [
    {
      title: 'Ảnh bìa',
      dataIndex: 'images',
      key: 'images',
      render: (images: string[]) =>
        images?.length > 0 ? (
          <Image width={50} src={images[0]} alt="Book Thumbnail" />
        ) : (
          <span>Không có ảnh</span>
        ),
    },
    {
      title: 'Tên sách',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      sorter: (a, b) => a.author.localeCompare(b.author),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => <Tag color="blue">#{cat}</Tag>, // Bạn có thể map sang tên danh mục nếu có
    },
    // {
    //   title: 'Mô tả',
    //   dataIndex: 'description',
    //   key: 'description',
    //   ellipsis: true,
    // },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) =>
        price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
    {
      title: 'Tồn kho',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Đã bán',
      dataIndex: 'soldAmount',
      key: 'soldAmount',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) =>
        status ? <Tag color="green">Còn bán</Tag> : <Tag color="red">Ngừng bán</Tag>,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditBookModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sách này?"
            onConfirm={() => handleDeleteBook(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddBookModal}>
          Thêm sách mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={books}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};

export default BooksTable;
