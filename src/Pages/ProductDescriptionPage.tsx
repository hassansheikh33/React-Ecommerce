import { LoaderFunction } from "react-router-dom";
import ProductDescription from "../Components/Products/ProductDescription/ProductDescription";
import { Product } from "../types";

export default function ProductDescriptionPage() {
  return <ProductDescription />;
}

export const singleProductLoader: LoaderFunction = async ({ params }) => {
  const category = params.categoryName;
  const productId = Number(params.productId);
  let endpoint = "";
  if (
    category === "jewelery" ||
    category === "men's clothing" ||
    category === "women's clothing" ||
    category === "electronics"
  ) {
    endpoint = `category/${category}`;
  } else {
    throw new Error("unrecognized category");
  }
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${endpoint}`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const product = data.filter((item: Product) => item.id === productId);
    if (product.length === 0) {
      throw new Error("Invalid Id");
    }
    return product[0];
  } catch (err) {
    console.log(err);
  }
};
