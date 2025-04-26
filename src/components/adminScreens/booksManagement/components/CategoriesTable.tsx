import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Category } from '../viewModel/BooksManagementViewModel';

interface CategoriesTableProps {
    categories: Category[];
    showAddCategoryModal: () => void;
    showEditCategoryModal: (category: Category) => void;
    handleDeleteCategory: (id: string) => void;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({
    categories,
    showAddCategoryModal,
    showEditCategoryModal,
    handleDeleteCategory,
}) => {
    const categoryColumns: ColumnsType<Category> = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => showEditCategoryModal(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa danh mục này?"
                        onConfirm={() => handleDeleteCategory(record.id)}
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
                <Button type="primary" icon={<PlusOutlined />} onClick={showAddCategoryModal}>
                    Thêm danh mục mới
                </Button>
            </div>
            <Table
                columns={categoryColumns}
                dataSource={categories}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
                scroll={{ x: 'max-content' }}
            />
        </>
    );
};

export default CategoriesTable;