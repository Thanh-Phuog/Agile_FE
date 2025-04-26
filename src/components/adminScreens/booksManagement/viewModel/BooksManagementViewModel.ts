import { useState } from 'react';
import { message } from 'antd';
import type { FormInstance } from 'antd';
import type { UploadFile } from 'antd/es/upload';

export interface Book {
    id: string;
    title: string;
    author: string;
    categories: string[];
    price: number;
    description: string;
    thumbnailUrl: string;
    additionalImageUrls: string[];
}

export interface Category {
    id: string;
    name: string;
}

const initialMockBooks: Book[] = [
    {
        id: '1',
        title: 'Lập trình Agile với Scrum',
        author: 'Ken Schwaber',
        categories: ['Công nghệ thông tin', 'Khoa học'],
        price: 250000,
        description: 'Một cuốn sách hướng dẫn về phương pháp phát triển phần mềm Agile Scrum.',
        thumbnailUrl: 'https://via.placeholder.com/150/0000FF/808080?text=Thumbnail+1',
        additionalImageUrls: [
            'https://via.placeholder.com/100/FF0000/FFFFFF?text=Add+1.1',
            'https://via.placeholder.com/100/FFFF00/000000?text=Add+1.2',
        ],
    },
];

const initialCategories: Category[] = [
    { id: '1', name: 'Công nghệ thông tin' },
    { id: '2', name: 'Văn học' },
    { id: '3', name: 'Kinh tế' },
    { id: '4', name: 'Khoa học' },
    { id: '5', name: 'Lịch sử' },
];

const useBooksManagementViewModel = (form: FormInstance) => {
    const [books, setBooks] = useState<Book[]>(initialMockBooks);
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isBookModalVisible, setIsBookModalVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    // Book Management
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

        if (editingBook) {
            const updatedBooks = books.map((book) =>
                book.id === editingBook.id ? { ...editingBook, ...values, thumbnailUrl, additionalImageUrls } : book
            );
            setBooks(updatedBooks);
            message.success('Cập nhật sách thành công!');
        } else {
            const newBook: Book = {
                id: Date.now().toString(),
                ...values,
                thumbnailUrl,
                additionalImageUrls,
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

    // Category Management
    const showAddCategoryModal = () => {
        setEditingCategory(null);
        form.resetFields();
        setIsCategoryModalVisible(true);
    };

    const showEditCategoryModal = (category: Category) => {
        setEditingCategory(category);
        form.setFieldsValue({ name: category.name });
        setIsCategoryModalVisible(true);
    };

    const handleCategoryCancel = () => {
        setIsCategoryModalVisible(false);
        setEditingCategory(null);
        form.resetFields();
    };

    const handleAddOrUpdateCategory = (values: any) => {
        if (editingCategory) {
            const updatedCategories = categories.map((cat) =>
                cat.id === editingCategory.id ? { ...cat, name: values.name } : cat
            );
            setCategories(updatedCategories);
            message.success('Cập nhật danh mục thành công!');
        } else {
            const newCategory: Category = {
                id: Date.now().toString(),
                name: values.name,
            };
            setCategories([newCategory, ...categories]);
            message.success('Thêm danh mục mới thành công!');
        }
        handleCategoryCancel();
    };

    const handleDeleteCategory = (id: string) => {
        const category = categories.find((cat) => cat.id === id);
        if (category && books.some((book) => book.categories.includes(category.name))) {
            message.error('Không thể xóa danh mục đang được sử dụng bởi một số sách!');
            return;
        }
        setCategories(categories.filter((cat) => cat.id !== id));
        message.success('Xóa danh mục thành công!');
    };

    return {
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
    };
};

export default useBooksManagementViewModel;