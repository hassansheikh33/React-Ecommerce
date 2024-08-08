import { LoaderFunction, useLoaderData } from "react-router-dom";
import AllProducts from "../Components/Products/AllProducts/AllProducts";
import { Product } from "../types";

export default function AllProductsPage() {
  const data = useLoaderData() as Product[];
  return <AllProducts data={data} />;
}

export const AllProductsLoader: LoaderFunction = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
