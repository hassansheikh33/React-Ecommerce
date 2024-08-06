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

export interface CartItem extends Product {
  amount: number;
}

export interface NotificationType {
  title: string;
  type: "error" | "success";
}
