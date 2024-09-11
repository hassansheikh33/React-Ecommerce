import {
  // LoaderFunction,
  Params,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import ProductDescription from "../Components/Products/ProductDescription/ProductDescription";
import { Helmet } from "react-helmet";
import { Product } from "../types";
// import { doc } from "firebase/firestore";
// import { fs } from "../Config/firebaseConfig";
// import { CategoryProductsLoader } from "./CategoryProductsPage";
// import { AllProductsLoader } from "./AllProductsPage";

export default function ProductDescriptionPage() {
  const params = useParams<Params>();
  const productId = Number(params.productId);
  const category = params.categoryName;
  const data = useRouteLoaderData("root") as Product[];
  if (productId > data.length) {
    throw new Error("invalid product ID");
  }
  const requiredIndex = data.findIndex((item) => item.id === productId);
  const product = data[requiredIndex];
  const otherProducts = data
    .filter((item: Product) => item.category === category)
    .filter((item) => item.id !== productId);

  return (
    <>
      <Helmet>
        <title>{product.title}</title>
        <meta
          name="description"
          content={`${product.title} : ${product.description} Buy Yours Now!`}
        />
      </Helmet>
      <ProductDescription
        data={data}
        product={product}
        otherProducts={otherProducts}
      />
      ;
    </>
  );
}

// export const singleProductLoader: LoaderFunction = async ({ params }) => {
//   const category = params.categoryName;
//   if (
//     !(
//       category === "electronics" ||
//       category === "men's clothing" ||
//       category === "women's clothing" ||
//       category === "jewelery"
//     )
//   ) {
//     throw new Error("invalid Category");
//   }
//   try {
//     const data = (await AllProductsLoader()) as Product[];

//   } catch (err) {
//     console.log(err);
//   }
// };
