import { useState, useEffect } from 'react';
import { message } from 'antd';
import type { FormInstance } from 'antd';
import type { UploadFile } from 'antd/es/upload';
import { CategoryRepo } from '@/api/features/category/CategoryRepo';
import { CategoryModel } from '@/api/features/category/model/CategoryModel';


const useCategoryManagementViewModel = (form: FormInstance) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryModel | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCategories, setTotalCategories] = useState(0);  

  const categoryRepo = new CategoryRepo();

  const fetchCategories = async (page = 1, limit = pageSize) => {
    setLoadingCategories(true);
    try {
      const response = await categoryRepo.getList({ page, limit });
      const fetchedCategories = Array.isArray(response.data)
        ? response.data.map((category) => ({
            id: category.id || '',
            name: category.name || '',
            description: category.description || '',
            createdAt: category.createdAt || '',
            updatedAt: category.updatedAt || '',
          }))
        : [];
      setCategories(fetchedCategories);
      setCurrentPage(page);
      setTotalCategories(response.paging.total || 0);  
    } catch (error) {
      message.error('Không thể tải danh sách danh mục!');
    } finally {
      setLoadingCategories(false);
    }
  };

  const handlePageChange = (page: number, newPageSize: number) => {
    if (page > 0) {
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);  
      }
      fetchCategories(page, newPageSize);
    }
  };

  const showAddCategoryModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsCategoryModalVisible(true);
  };

  const showEditCategoryModal = async (category: CategoryModel) => {
    try {
      const response = await categoryRepo.getById(category.id!);
      const categoryDetails = {
        id: response.data.id || '',
        name: response.data.name || '',
        description: response.data.description || '',
        createdAt: response.data.createdAt || '',
        updatedAt: response.data.updatedAt || '',
      };
      setEditingCategory(categoryDetails);
      form.setFieldsValue(categoryDetails);
      setIsCategoryModalVisible(true);
    } catch (error) {
      message.error('Không thể lấy chi tiết danh mục, sử dụng dữ liệu hiện tại.');
      const fallbackCategory = {
        id: category.id || '',
        name: category.name || '',
        description: category.description || '',
        createdAt: category.createdAt || '',
        updatedAt: category.updatedAt || '',
      };
      setEditingCategory(fallbackCategory);
      form.setFieldsValue(fallbackCategory);
      setIsCategoryModalVisible(true);
    }
  };

  const handleCategoryCancel = () => {
    setIsCategoryModalVisible(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const handleAddOrUpdateCategory = async (values: CategoryModel) => {
    try {
      const payload = {
        name: values.name.trim(),
        description: values.description?.trim() || '',
        status: true,
      };
      if (editingCategory) {
        await categoryRepo.update(editingCategory.id!, payload);
        message.success('Cập nhật danh mục thành công!');
      } else {
        await categoryRepo.create(payload);
        message.success('Thêm danh mục mới thành công!');
      }
      fetchCategories(currentPage, pageSize); 
    } catch (error) {
      message.error('Không thể lưu danh mục!');
    } finally {
      handleCategoryCancel();  
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await categoryRepo.delete(id);
      message.success('Xóa danh mục thành công!');
      fetchCategories(currentPage, pageSize);
    } catch (error) {
      message.error('Không thể xóa danh mục!');
    }
  };

  useEffect(() => {
    fetchCategories(currentPage, pageSize);
  }, []);

  return {
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
  };
};

export default useCategoryManagementViewModel;