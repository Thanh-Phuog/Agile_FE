import React from 'react';
import { Table, Button, Space, Image, Tag, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Book } from '../viewModel/BooksManagementViewModel';

interface BooksTableProps {
    books: Book[];
    showAddBookModal: () => void;
    showEditBookModal: (book: Book) => void;
    handleDeleteBook: (id: string) => void;
}

const BooksTable: React.FC<BooksTableProps> = ({
    books,
    showAddBookModal,
    showEditBookModal,
    handleDeleteBook,
}) => {
    const bookColumns: ColumnsType<Book> = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnailUrl',
            key: 'thumbnailUrl',
            render: (url: string) => <Image width={50} src={url} alt="Thumbnail" />,
        },
        {
            title: 'Tên sách',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
            sorter: (a, b) => a.author.localeCompare(b.author),
        },
        {
            title: 'Danh mục',
            dataIndex: 'categories',
            key: 'categories',
            render: (categories: string[]) => categories.map((cat) => <Tag color="blue" key={cat}>{cat}</Tag>),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
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
                columns={bookColumns}
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