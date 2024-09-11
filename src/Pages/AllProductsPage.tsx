import { useRouteLoaderData } from "react-router-dom";
import AllProducts from "../Components/Products/AllProducts/AllProducts";
import { Product } from "../types";
import { Helmet } from "react-helmet";
import { collection, getDocs } from "firebase/firestore";
import { fs } from "../Config/firebaseConfig";

export default function AllProductsPage() {
  const data = useRouteLoaderData("root") as Product[];
  return (
    <>
      <Helmet>
        <title>Shop</title>
        <meta
          name="description"
          content="20% off! Browse all our products at awesome prices! Buy yours now!"
        />
      </Helmet>
      <AllProducts data={data} />;
    </>
  );
}

export const AllProductsLoader = async () => {
  try {
    const productsCollection = collection(fs, "products");
    const response = await getDocs(productsCollection);
    if (response.docs.length > 0) {
      const data = response.docs.map((doc) => ({ ...doc.data() }));
      return data;
    } else {
      throw new Error("Products not found");
    }
  } catch (err) {
    console.log(err);
  }
};
