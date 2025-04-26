import React, { useState } from 'react';
import { Card, Divider, Tabs } from 'antd';
import BooksTable from '../components/BooksTable';
import CategoriesTable from '../components/CategoriesTable';
import BookModal from '../components/BookModal';
import CategoryModal from '../components/CategoryModal';
import useBooksManagementViewModel from '../viewModel/BooksManagementViewModel'; 
import { Form } from 'antd';
const { TabPane } = Tabs;

const BooksManagementScreen = () => {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('books');
    const {
        books,
        categories,
        isBookModalVisible,
        isCategoryModalVisible,
        editingBook,
        editingCategory,
        showAddBookModal,
        showEditBookModal,
        handleBookCancel,
        handleAddOrUpdateBook,
        handleDeleteBook,
        showAddCategoryModal,
        showEditCategoryModal,
        handleCategoryCancel,
        handleAddOrUpdateCategory,
        handleDeleteCategory,
    } = useBooksManagementViewModel(form);

    return (
        <div className="p-4 md:p-8">
            <Card bordered={false} style={{ backgroundColor: '#f0f2f5' }}>
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <TabPane tab="Quản lý sách" key="books">
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
                    </TabPane>
                    <TabPane tab="Quản lý danh mục" key="categories">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
                        </div>
                        <Divider />
                        <CategoriesTable
                            categories={categories}
                            showAddCategoryModal={showAddCategoryModal}
                            showEditCategoryModal={showEditCategoryModal}
                            handleDeleteCategory={handleDeleteCategory}
                        />
                    </TabPane>
                </Tabs>
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