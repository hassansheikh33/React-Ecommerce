import { useLoaderData } from "react-router-dom";
import Products from "../Components/Products/Products/Products";
import { Product } from "../types";

export default function ProductsPage() {
  const data = useLoaderData() as Product[];
  return <Products data={data} />;
}

export const productsLoader = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
