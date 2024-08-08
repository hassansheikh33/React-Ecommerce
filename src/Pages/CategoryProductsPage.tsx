import { LoaderFunction } from "react-router-dom";
import CategoryProducts from "../Components/Products/CategoryProducts/CategoryProducts";

export default function ProductsPage() {
  return <CategoryProducts />;
}

export const CategoryProductsLoader: LoaderFunction = async ({ params }) => {
  const category = params.categoryName;
  let endpoint = "";
  if (
    category === "jewelery" ||
    category === "men's clothing" ||
    category === "women's clothing" ||
    category === "electronics"
  ) {
    endpoint = `/category/${category}`;
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
    return { data, category };
  } catch (err) {
    console.log(err);
  }
};
