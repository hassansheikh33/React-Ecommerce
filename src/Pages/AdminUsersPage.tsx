import { LoaderFunction } from "react-router-dom";
import AllUsers from "../Components/Admin/Users/AllUsers/AllUsers";

export default function AdminUsersPage() {
  return <AllUsers />;
}

export const usersLoader: LoaderFunction = async () => {
  //load admins and users from firebase and return them in an object
  return {
    admins: [],
    users: [],
  };
};
