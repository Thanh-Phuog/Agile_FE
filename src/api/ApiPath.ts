export const ApiPath = {
  // Auth
  LOGIN: getApiPath("auth/login"),
  REGISTER: getApiPath("auth/register"),
  // Category
  CATEGORY_ALL: getApiPath("category/all"),
  CATEGORY_CREATE: getApiPath("category/create"),
  CATEGORY_UPDATE: getApiPath("category/update/"),
  CATEGORY_DELETE: getApiPath("category/delete/"),
  CATEGORY_DETAIL: getApiPath("category/detail/"),
  CATEGORY_LIST: getApiPath("category/list"),

  //book
  BOOK_CREATE: getApiPath("book/create"),
  BOOK_UPDATE: getApiPath("book/update/"),
  BOOK_DELETE: getApiPath("book/delete/"),
  BOOK_DETAIL: getApiPath("book/detail/"),
  BOOK_LIST: getApiPath("book/list"),

  // Bills
  BILL_CREATE: getApiPath("bills"),
  BILL_GET_ADMIN: getApiPath("bills"),
  BILL_GET_USER: getApiPath("bills/my"),
  BILL_PATCH: getApiPath("bills/"),

  //Cart
  CART_ADD: getApiPath("cart"),
  CART_GET: getApiPath("cart"),
  CART_DELETE: getApiPath("cart/"),
  CART_UPDATE: getApiPath("cart/"),

  // User
  CREATE_USER: getApiPath("user/create"),
  GET_USER: getApiPath("user/list"),
  UPDATE_USER: getApiPath("user/update/"),
};

function getApiPath(path: string) {
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT!}/api/${path}`;
} 