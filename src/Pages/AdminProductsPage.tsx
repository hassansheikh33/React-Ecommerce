import { Helmet } from "react-helmet";
import AdminProducts from "../Components/Admin/AdminProducts/AllAdminProducts/AllAdminProducts";

export default function AdminAllProductsPage() {
  return (
    <>
      <Helmet>
        <title>All Products</title>
        <meta name="description" content="All products page for admins only" />
      </Helmet>
      <AdminProducts />;
    </>
  );
}
