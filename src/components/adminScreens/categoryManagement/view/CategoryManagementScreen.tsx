'use client';
import React, { useState } from 'react';
import { Card, Divider, Tabs, Form } from 'antd';
import CategoriesTable from '../../categoryManagement/components/CategoriesTable';
import CategoryModal from '../../categoryManagement/components/CategoryModal';
import useCategoryManagementViewModel from '../viewModel/CategoryManagamentViewModel';

const CategoryManagementScreen = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('books');
  const {
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
  } = useCategoryManagementViewModel(form);


  return (
    <div className="p-4 md:p-8">
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
        <CategoryModal
          form={form}
          isCategoryModalVisible={isCategoryModalVisible}
          editingCategory={editingCategory}
          handleCategoryCancel={handleCategoryCancel}
          handleAddOrUpdateCategory={handleAddOrUpdateCategory}
        />
    </div>
  );
};

export default CategoryManagementScreen;