import { Helmet } from "react-helmet";
import AllUsers from "../Components/Admin/Users/AllUsers/AllUsers";

export default function AdminUsersPage() {
  return (
    <>
      <Helmet>
        <title>All Users</title>
        <meta
          name="description"
          content="All Users page for the admins of react-ecommerce, here admins can add or remove an admin or change the password for an admin, or view all the users"
        />
      </Helmet>
      <AllUsers />;
    </>
  );
}
