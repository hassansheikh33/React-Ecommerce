import { AdminProduct, CartItem, OrderItem, Product } from "../types";

export const transformToProduct = (adminProduct: AdminProduct) => {
  const product: Product = {
    id: adminProduct.id,
    price: adminProduct.price,
    title: adminProduct.title,
    category: adminProduct.category,
    description: adminProduct.description,
    image: adminProduct.image,
    rating: {
      rate: adminProduct.rating.rate,
      count: adminProduct.rating.count,
    },
  };
  return product;
};

export const transformToCartItem = (adminProduct: Product, amount: number) => {
  const product: CartItem = {
    id: adminProduct.id,
    price: adminProduct.price,
    title: adminProduct.title,
    category: adminProduct.category,
    image: adminProduct.image,
    rating: {
      rate: adminProduct.rating.rate,
      count: adminProduct.rating.count,
    },
    amount,
  };
  return product;
};

export const transformToOrderItem = (cartItem: CartItem) => {
  const product: OrderItem = {
    amount: cartItem.amount,
    id: cartItem.id,
    price: cartItem.price,
    title: cartItem.title,
  };
  return product;
};
