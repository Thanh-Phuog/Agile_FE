import React from 'react';
import { Table, Button, Pagination, Spin } from 'antd';
import { CategoryModel } from '@/api/features/category/model/CategoryModel';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface CategoriesTableProps {
  categories: CategoryModel[];
  loading: boolean;
  currentPage: number;
  pageSize: number;
  totalCategories: number;
  showAddCategoryModal: () => void;
  showEditCategoryModal: (category: CategoryModel) => void;
  handleDeleteCategory: (id: string) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
  loading,
  currentPage,
  pageSize,
  totalCategories,
  showAddCategoryModal,
  showEditCategoryModal,
  handleDeleteCategory,
  onPageChange,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-4);
    return `${day}/${month}/${year}`;
  };

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => formatDate(text),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => formatDate(text),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: CategoryModel) => (
        <div className="flex space-x-2">
          <Button 
            icon={<EditOutlined />}
            onClick={() => showEditCategoryModal(record)} 
          >
            Sửa
          </Button>
          <Button 
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCategory(record.id!)} 
            danger
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          type="primary"
          onClick={showAddCategoryModal}
          className="bg-green-500 hover:bg-green-600 transition-colors text-white font-semibold py-2 px-4 rounded"
        >
          Thêm danh mục
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="id"
          pagination={false}
          className="shadow-md rounded"
        />
        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCategories}
            onChange={onPageChange}
            showSizeChanger
            pageSizeOptions={['5', '10', '20']}
          />
        </div>
      </Spin>
    </div>
  );
};

export default CategoriesTable;