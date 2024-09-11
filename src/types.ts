export interface AdminProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
}

export type Product = Omit<AdminProduct, "stock">;

export type CartItem = Omit<Product, "description"> & {
  amount: number;
};

export type OrderItem = Pick<CartItem, "id" | "title" | "price" | "amount">;

export interface NotificationType {
  title: string;
  type: "error" | "success" | "progress";
}

export interface Cart {
  cartItems: CartItem[];
  totalAmount: number;
  totalNumItems: number;
}

export interface UserData {
  uid: string;
  name: string;
  email: string;
  cart: {
    cartItems: CartItem[];
    totalAmount: number;
    totalNumItems: number;
  };
  dateCreated: string;
}

export interface OrderFormError {
  name: string | null;
  email: string | null;
  number: string | null;
  address: string | null;
  method: string | null;
}

export interface Order {
  uid: string;
  name: string;
  email: string;
  address: string;
  number: number;
  payment_method: string;
  order: {
    items: OrderItem[];
    totalAmount: number;
    totalNumItems: number;
  };
}

export interface AuthFormError {
  name: string | null;
  email: string | null;
  password: string | null;
}

export interface ContactFormError {
  name: string | null;
  email: string | null;
  query: string | null;
}

export interface AdminLoginError {
  email: string | null;
  password: string | null;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface AdminData {
  admins: AdminCredentials[];
  users: UserData[];
  products: AdminProduct[];
  orders: Order[];
}

export interface ProductFormError {
  id: number | null;
  title: string | null;
  price: string | null;
  category: string | null;
  description: string | null;
  image: string | null;
  rate: string | null;
  count: string | null;
  stock: string | null;
}

export interface NewAdminError {
  email: string | null;
  password: string | null;
}
