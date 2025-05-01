import { useState, useEffect } from 'react';
import { message } from 'antd';
import type { FormInstance } from 'antd';
import type { UploadFile } from 'antd/es/upload';
import { CategoryRepo } from '@/api/features/category/CategoryRepo';
import { CategoryModel } from '@/api/features/category/model/CategoryModel';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  thumbnailUrl: string;
  additionalImageUrls: string[];
  categories: string[];
}

const initialMockBooks: Book[] = [
  {
    id: '1',
    title: 'Lập trình Agile với Scrum',
    author: 'Ken Schwaber',
    price: 250000,
    description: 'Một cuốn sách hướng dẫn về phương pháp phát triển phần mềm Agile Scrum.',
    thumbnailUrl: 'https://via.placeholder.com/150/0000FF/808080?text=Thumbnail+1',
    additionalImageUrls: [
      'https://via.placeholder.com/100/FF0000/FFFFFF?text=Add+1.1',
      'https://via.placeholder.com/100/FFFF00/000000?text=Add+1.2',
    ],
    categories: ['Agile', 'Scrum'],
  },
];

const useBooksManagementViewModel = (form: FormInstance) => {
  const [books, setBooks] = useState<Book[]>(initialMockBooks);
  const [isBookModalVisible, setIsBookModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
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

  const showAddBookModal = () => {
    setEditingBook(null);
    form.resetFields();
    setIsBookModalVisible(true);
  };

  const showEditBookModal = (book: Book) => {
    setEditingBook(book);
    form.setFieldsValue({
      ...book,
      thumbnail: [],
      additionalImages: [],
      categories: book.categories || [],
    });
    setIsBookModalVisible(true);
  };

  const handleBookCancel = () => {
    setIsBookModalVisible(false);
    setEditingBook(null);
    form.resetFields();
  };

  const handleAddOrUpdateBook = (values: any) => {
    const thumbnailUrl = values.thumbnail?.[0]?.thumbUrl || editingBook?.thumbnailUrl || '';
    const additionalImageUrls = values.additionalImages?.map((file: UploadFile) => file.thumbUrl) || editingBook?.additionalImageUrls || [];
    const categories = values.categories || [];

    if (editingBook) {
      const updatedBooks = books.map((book) =>
        book.id === editingBook.id
          ? { ...editingBook, ...values, thumbnailUrl, additionalImageUrls, categories }
          : book
      );
      setBooks(updatedBooks);
      message.success('Cập nhật sách thành công!');
    } else {
      const newBook: Book = {
        id: Date.now().toString(),
        ...values,
        thumbnailUrl,
        additionalImageUrls,
        categories,
      };
      setBooks([newBook, ...books]);
      message.success('Thêm sách mới thành công!');
    }
    handleBookCancel();
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
    message.success('Xóa sách thành công!');
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
  };
};

export default useBooksManagementViewModel;