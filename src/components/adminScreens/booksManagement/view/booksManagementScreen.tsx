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
  const {
    book,
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
    currentPage,
    pageSize,
    TotalBook,
    handlePageChange,
    loadingBooks,
  } = useBooksManagementViewModel(form);
  
  

  return (
    <div className="p-4 md:p-8">
<div className="mb-6">
            <h1 className="text-2xl font-bold">Quản lý sách</h1>
          </div>
          <Divider />
          <BooksTable
            book={book}
            showAddBookModal={showAddBookModal}
            showEditBookModal={showEditBookModal}
            handleDeleteBook={handleDeleteBook}
            loading={loadingBooks}
            currentPage={currentPage}
            pageSize={pageSize}
            totalBook={TotalBook}
            onPageChange={handlePageChange}
          />
        <BookModal
          form={form}
          
          isBookModalVisible={isBookModalVisible}
          editingBook={editingBook}
          handleBookCancel={handleBookCancel}
          handleAddOrUpdateBook={handleAddOrUpdateBook}
        />


     
    </div>
  );
};

export default BooksManagementScreen;