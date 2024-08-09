import { LoaderFunction } from "react-router-dom";
import ProductDescription from "../Components/Products/ProductDescription/ProductDescription";

export default function ProductDescriptionPage() {
  return <ProductDescription />;
}

export const singleProductLoader: LoaderFunction = async ({ params }) => {
  const category = params.categoryName;
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
    if (data.length > 0) {
      return data;
    }
    throw new Error("No Data Found");
  } catch (err) {
    console.log(err);
  }
};
