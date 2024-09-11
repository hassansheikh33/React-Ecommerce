import { Helmet } from "react-helmet";
import NewProduct from "../Components/Admin/AdminProducts/NewProduct/NewProduct";

export default function AdminNewProductPage() {
  return (
    <>
      <Helmet>
        <title>New Product</title>
        <meta name="description" content="Add a new product (admin only)" />
      </Helmet>
      <NewProduct />;
    </>
  );
}
