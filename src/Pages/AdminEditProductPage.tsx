import EditProduct from "../Components/Admin/AdminProducts/EditProduct/EditProduct";
import { LoaderFunction, redirect, useLoaderData } from "react-router-dom";
import store from "../store/redux-store";
import { setNofication } from "../Util/notification";
import { AdminProduct } from "../types";
import { getAdminData } from "../store/admin-thunks";
import { Helmet } from "react-helmet";

export default function AdminEditProductPage() {
  const product = useLoaderData() as AdminProduct;
  return (
    <>
      <Helmet>
        <title>Edit Product</title>
        <meta
          name="description"
          content={`Edit ${product.title}. Admin only`}
        />
      </Helmet>
      <EditProduct product={product} />;
    </>
  );
}

export const editProductLoader: LoaderFunction = async ({ params }) => {
  const productId = Number(params.editId);
  let allProducts = store.getState().admin.products;
  if (allProducts.length === 0) {
    await store.dispatch(getAdminData());
    allProducts = store.getState().admin.products;
  }
  const indexToEdit = allProducts.findIndex((item) => item.id === productId);
  if (indexToEdit < 0) {
    setNofication("error", "Invalid Product Id");
    return redirect("/admin/products");
  } else {
    const productToEdit = allProducts[indexToEdit];
    return productToEdit;
  }
};
