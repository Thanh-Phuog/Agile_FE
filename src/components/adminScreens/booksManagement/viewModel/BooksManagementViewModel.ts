import { useState, useEffect } from 'react';
import { message } from 'antd';
import type { FormInstance } from 'antd';
import type { UploadFile } from 'antd/es/upload';
import { CategoryRepo } from '@/api/features/category/CategoryRepo';
import { CategoryModel } from '@/api/features/category/model/CategoryModel';
import { BookModel, BookModelRequest, BookModelUpdate } from '@/api/features/book/model/BookModel';
import { BookRepo } from '@/api/features/book/BookRepo';



const useBooksManagementViewModel = (form: FormInstance) => {
  const [book, setBook] = useState<BookModel[]>([]);
  const [isBookModalVisible, setIsBookModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState<BookModel | null>(null);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryModel | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [TotalBook, setTotalBook] = useState(0);  
  const [loadingBooks, setLoadingBooks] = useState(false);

  const bookRepo = new BookRepo();

  const fetchBook = async (page = 1, limit = pageSize) => {
    setLoadingBooks(true);
    try {
      const response = await bookRepo.getList({ page, limit });
      const fetchedBooks = response.data || [];
      setBook(fetchedBooks); 
      setCurrentPage(page);
      setTotalBook(response.paging.total || 0);  
    } catch (error) {
      message.error('Không thể tải danh sách quyển sách !');
    } finally {
      setLoadingCategories(false);
    }
  };

  const handlePageChange = (page: number, newPageSize: number) => {
    if (page > 0) {
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);  
      }
      fetchBook(page, newPageSize);
    }
  };

  const showAddBookModal = () => {
    setEditingBook(null);
    form.resetFields();
    setIsBookModalVisible(true);
  };

  const showEditBookModal = (book: BookModel) => {
    setEditingBook(book);
    form.setFieldsValue({
      ...book,
      thumbnail: [],
      additionalImages: [],
      categories: book.category || [],
    });
    setIsBookModalVisible(true);
  };

  const handleBookCancel = () => {
    setIsBookModalVisible(false);
    setEditingBook(null);
    form.resetFields();
  };

const handleAddOrUpdateBook = async (values: any) => {
  try {
    console.log('values', values);

   const imageFiles =
  values.newImages?.map((file: any) => file.originFileObj).filter(Boolean) || [];

const data: BookModelRequest = {
  name: values.name,
  author: values.author,
  price: values.price,
  categoryId: values.category,
  description: values.description,
  images: imageFiles,
  totalAmount: values.totalAmount,
  status: values.status,
};

const dataUpdate: BookModelUpdate = {
  id: editingBook?.id,
  name: values.name,
  author: values.author,
  price: values.price,
  categoryId: values.category,
  description: values.description,
  newImages: imageFiles,
  images: values.images?.map((file: any) => file.url) || [], // giữ lại ảnh cũ dạng URL
  totalAmount: values.totalAmount,
  status: values.status,
};


    let response: { data: BookModel };

    if (editingBook) {
      response = await bookRepo.update(editingBook.id, dataUpdate);
      if (response.data) {
      message.success('Cập nhật sách thành công!');
      setIsBookModalVisible(false);}
      else{
        message.error('Cập nhật sách thất bại, vui lòng thử lại!');
      }
      
    } else {
      response = await bookRepo.create(data);
      if (!response.data) {
        message.error('Thêm sách thất bại, vui lòng thử lại!');
        return;
      }else {
      message.success('Thêm sách thành công!');
      setBook((prevBooks) => [...prevBooks, response.data]);
      setIsBookModalVisible(false);}
    }

    fetchBook(currentPage, pageSize);
  } catch (error) {
    console.error(error);
    message.error('Không thể thêm hoặc cập nhật sách!');
  }
};



  const handleDeleteBook = async(id: string) => {
    try {
      await bookRepo.delete(id);
      const updatedBooks = book.filter((book) => book.id !== id);
      setBook(updatedBooks);
      message.success('Xóa sách thành công!');
    } catch (error) {
      message.error('Không thể xóa sách!');

    }
  };

  useEffect(() => {
    fetchBook(currentPage, pageSize);
  }, []);
  return {
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
  };
};

export default useBooksManagementViewModel;