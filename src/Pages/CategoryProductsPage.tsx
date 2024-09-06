import { Params, useParams, useRouteLoaderData } from "react-router-dom";
import CategoryProducts from "../Components/Products/CategoryProducts/CategoryProducts";
import { Helmet } from "react-helmet";
import { Product } from "../types";

export default function ProductsPage() {
  let data = useRouteLoaderData("root") as Product[];
  const params = useParams<Params>();
  const category = params.categoryName;
  const products = data.filter((item) => item.category === category);
  return (
    <>
      <Helmet>
        <title>Shop - {category}</title>
        <meta
          name="description"
          content={`20% off! Browse all our ${category} products at awesome prices! Buy yours now!`}
        />
      </Helmet>
      <CategoryProducts data={products} category={category} />;
    </>
  );
}

// export const CategoryProductsLoader: LoaderFunction = async ({ params }) => {
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
//     return { data: categoryProducts, category };
//   } catch (err) {
//     console.log(err);
//   }
// };
