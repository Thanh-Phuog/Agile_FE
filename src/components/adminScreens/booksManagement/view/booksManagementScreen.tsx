'use client';
import React, { useState } from 'react';
import { Card, Divider, Tabs, Form } from 'antd';
import BooksTable from '../components/BooksTable';
import BookModal from '../components/BookModal';
import useBooksManagementViewModel from '../viewModel/BooksManagementViewModel';
import CategoryModal from '../../categoryManagement/components/CategoryModal';
import CategoriesTable from '../../categoryManagement/components/CategoriesTable';

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

  return (
    <div className="p-4 md:p-8">
<div className="mb-6">
            <h1 className="text-2xl font-bold">Quản lý sách</h1>
          </div>
          <Divider />
          <BooksTable
            // books={books}
            showAddBookModal={showAddBookModal}
            showEditBookModal={showEditBookModal}
            handleDeleteBook={handleDeleteBook}
          />
        <BookModal
          form={form}
          // categories={categories}
          isBookModalVisible={isBookModalVisible}
          editingBook={editingBook}
          handleBookCancel={handleBookCancel}
          handleAddOrUpdateBook={handleAddOrUpdateBook}
        />


     
    </div>
  );
};

export default BooksManagementScreen;