import { BookModel } from "@/api/features/authenticate/book/BookModel";

const books: BookModel[] = [
    {
      id: "1",
      title: "Clean Code",
      author: "Robert C. Martin",
      description: "Cuốn sách kinh điển về cách viết mã sạch, dễ đọc và dễ bảo trì.",
      price: 24.99,
      imageUrl: "https://m.media-amazon.com/images/I/41-sN-mzwKL._SY445_SX342_.jpg",
    },
    {
      id: "2",
      title: "You Don't Know JS: Scope & Closures",
      author: "Kyle Simpson",
      description: "Khám phá sâu về phạm vi và closures trong JavaScript.",
      price: 14.99,
      imageUrl: "https://m.media-amazon.com/images/I/81kqrwS1nNL.jpg",
    },
    {
      id: "3",
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      description: "Cuốn sách giúp bạn trở thành lập trình viên thực thụ với mindset chuẩn.",
      price: 29.99,
      imageUrl: "https://m.media-amazon.com/images/I/518FqJvR9aL._SX380_BO1,204,203,200_.jpg",
    },
    {
      id: "4",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      description: "Sách giáo trình thuật toán nổi tiếng, thường được dùng trong đại học.",
      price: 49.99,
      imageUrl: "https://m.media-amazon.com/images/I/61+eJ05G3yL._SL1000_.jpg",
    },
    {
      id: "5",
      title: "Eloquent JavaScript",
      author: "Marijn Haverbeke",
      description: "Một cuốn sách tuyệt vời để học JavaScript từ cơ bản đến nâng cao.",
      price: 19.99,
      imageUrl: "https://eloquentjavascript.net/img/cover.jpg",
    }
  ];

  export default books;