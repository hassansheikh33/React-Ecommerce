import { Helmet } from "react-helmet";
import Dashboard from "../Components/Admin/Dashboard/Dashboard";

export default function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta
          name="description"
          content="This is the admin dashboard for the admins of React-Ecommerce. If you are not an admin, you cannot sign up"
        />
      </Helmet>
      <Dashboard />;
    </>
  );
}
