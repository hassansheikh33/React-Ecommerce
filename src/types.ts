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

export interface Product {
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
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  amount: number;
}

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
}

export interface OrderFormError {
  name: string | null;
  email: string | null;
  number: string | null;
  address: string | null;
  method: string | null;
}

export interface Order extends UserData {
  address: string;
  number: number;
  payment_method: string;
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
