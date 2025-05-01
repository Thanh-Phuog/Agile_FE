'use client';
import React, { useState } from 'react';
import { Card, Divider, Tabs, Form } from 'antd';
import BooksTable from '../components/BooksTable';
import CategoriesTable from '../components/CategoriesTable';
import BookModal from '../components/BookModal';
import CategoryModal from '../components/CategoryModal';
import useBooksManagementViewModel from '../viewModel/BooksManagementViewModel';

const BooksManagementScreen = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('books');
  const {
    books,
    isBookModalVisible,
    editingBook,
    showAddBookModal,
    showEditBookModal,
    handleBookCancel,
    handleAddOrUpdateBook,
    handleDeleteBook,
    categories,
    isCategoryModalVisible,
    editingCategory,
    loadingCategories,
    showAddCategoryModal,
    showEditCategoryModal,
    handleCategoryCancel,
    handleAddOrUpdateCategory,
    handleDeleteCategory,
    currentPage,
    pageSize,
    totalCategories,
    handlePageChange,
  } = useBooksManagementViewModel(form);

  const tabItems = [
    {
      key: 'books',
      label: 'Quản lý sách',
      children: (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Quản lý sách</h1>
          </div>
          <Divider />
          <BooksTable
            books={books}
            showAddBookModal={showAddBookModal}
            showEditBookModal={showEditBookModal}
            handleDeleteBook={handleDeleteBook}
          />
        </>
      ),
    },
    {
      key: 'categories',
      label: 'Quản lý danh mục',
      children: (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
          </div>
          <Divider />
          <CategoriesTable
            categories={categories}
            loading={loadingCategories}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCategories={totalCategories}
            showAddCategoryModal={showAddCategoryModal}
            showEditCategoryModal={showEditCategoryModal}
            handleDeleteCategory={handleDeleteCategory}
            onPageChange={handlePageChange}
          />
        </>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <Card variant="borderless" style={{ backgroundColor: '#f0f2f5' }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>

      {activeTab === 'books' && (
        <BookModal
          form={form}
          categories={categories}
          isBookModalVisible={isBookModalVisible}
          editingBook={editingBook}
          handleBookCancel={handleBookCancel}
          handleAddOrUpdateBook={handleAddOrUpdateBook}
        />
      )}

      {activeTab === 'categories' && (
        <CategoryModal
          form={form}
          isCategoryModalVisible={isCategoryModalVisible}
          editingCategory={editingCategory}
          handleCategoryCancel={handleCategoryCancel}
          handleAddOrUpdateCategory={handleAddOrUpdateCategory}
        />
      )}
    </div>
  );
};

export default BooksManagementScreen;