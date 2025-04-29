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

  const categoryRepo = new CategoryRepo();

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

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await categoryRepo.getAll();
      setCategories(
        Array.isArray(response.data)
          ? response.data.map((category) => ({
              ...category,
              name: category.name || '',
              description: category.description || '',
            }))
          : [{
              ...response.data,
              name: response.data.name || '',
              description: response.data.description || '',
            }]
      );
    } catch (error) {
      message.error('Không thể tải danh sách danh mục!');
    } finally {
      setLoadingCategories(false);
    }
  };

  const getCategoryDetails = async (id: string) => {
    try {
      const response = await categoryRepo.getById(id);
      return response.data;
    } catch (error) {
      message.error('Không thể lấy chi tiết danh mục!');
      throw error;
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
        ...response.data,
        name: response.data.name || '',
        description: response.data.description || '',
      };
      setEditingCategory(categoryDetails);
      form.setFieldsValue(categoryDetails);
      setIsCategoryModalVisible(true);
    } catch (error) {
      message.error('Không thể lấy chi tiết danh mục, sử dụng dữ liệu hiện tại.');
      const fallbackCategory = {
        ...category,
        name: category.name || '',
        description: category.description || '',
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
      fetchCategories();
      handleCategoryCancel();
    } catch (error) {
      message.error('Không thể lưu danh mục!');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await categoryRepo.delete(id);
      message.success('Xóa danh mục thành công!');
      fetchCategories();
    } catch (error) {
      message.error('Không thể xóa danh mục!');
    }
  };

  useEffect(() => {
    fetchCategories();
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
    getCategoryDetails,
  };
};

export default useBooksManagementViewModel;