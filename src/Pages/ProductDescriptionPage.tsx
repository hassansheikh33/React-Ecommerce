import {
  LoaderFunction,
  Params,
  useLoaderData,
  useParams,
} from "react-router-dom";
import ProductDescription from "../Components/Products/ProductDescription/ProductDescription";
import { Helmet } from "react-helmet";
import { Product } from "../types";

export default function ProductDescriptionPage() {
  const params = useParams<Params>();
  const productId = Number(params.productId);
  const data = useLoaderData() as Product[];
  const products = data.filter((item: Product) => item.id === productId);
  const product = products[0];
  return (
    <>
      <Helmet>
        <title>{product.title}</title>
        <meta
          name="description"
          content={`${product.title} : ${product.description} Buy Yours Now!`}
        />
      </Helmet>
      <ProductDescription />;
    </>
  );
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
