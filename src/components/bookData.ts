import { BookModel } from "@/api/features/book/model/BookModel";

const books: BookModel[] = [
  {
    id: "1",
    name: "Clean Code",
    author: "Robert C. Martin",
    price: 24.99,
    category: "Lập trình",
    description: "Cuốn sách kinh điển về cách viết mã sạch, dễ đọc và dễ bảo trì.",
    status: true,
    images: [
      "https://m.media-amazon.com/images/I/41-sN-mzwKL._SY445_SX342_.jpg"
    ],
    totalAmount: 100,
    soldAmount: 30,
  },
  {
    id: "2",
    name: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    price: 14.99,
    category: "Lập trình",
    description: "Khám phá sâu về phạm vi và closures trong JavaScript.",
    status: true,
    images: [
      "https://m.media-amazon.com/images/I/81kqrwS1nNL.jpg",
      "https://m.media-amazon.com/images/I/81kqrwS1nNL.jpg",
      "https://m.media-amazon.com/images/I/81kqrwS1nNL.jpg",
      "https://m.media-amazon.com/images/I/81kqrwS1nNL.jpg",
      "https://m.media-amazon.com/images/I/81kqrwS1nNL.jpg"
    ],
    totalAmount: 80,
    soldAmount: 50,
  },
  {
    id: "3",
    name: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    price: 29.99,
    category: "Phát triển phần mềm",
    description: "Cuốn sách giúp bạn trở thành lập trình viên thực thụ với mindset chuẩn.",
    status: true,
    images: [
      "https://m.media-amazon.com/images/I/518FqJvR9aL._SX380_BO1,204,203,200_.jpg"
    ],
    totalAmount: 60,
    soldAmount: 20,
  },
  {
    id: "4",
    name: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    price: 49.99,
    category: "Thuật toán",
    description: "Sách giáo trình thuật toán nổi tiếng, thường được dùng trong đại học.",
    status: true,
    images: [
      "https://m.media-amazon.com/images/I/61+eJ05G3yL._SL1000_.jpg"
    ],
    totalAmount: 120,
    soldAmount: 70,
  },
  {
    id: "5",
    name: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    price: 19.99,
    category: "JavaScript",
    description: "Một cuốn sách tuyệt vời để học JavaScript từ cơ bản đến nâng cao.",
    status: true,
    images: [
      "https://eloquentjavascript.net/img/cover.jpg",
      "https://eloquentjavascript.net/img/cover.jpg",
      "https://eloquentjavascript.net/img/cover.jpg"
    ],
    totalAmount: 90,
    soldAmount: 45,
  }
];

export default books;
