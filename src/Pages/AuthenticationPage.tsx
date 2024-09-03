import {
  LoaderFunction,
  Outlet,
  redirect,
  useSearchParams,
} from "react-router-dom";
import Authentication from "../Components/Authentication/Authentication";
import { getToken } from "../Util/token";
import { Helmet } from "react-helmet";

export default function AuthenticationPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  return (
    <>
      <Helmet>
        <title>{mode}</title>
        <meta
          name="description"
          content={`${mode} to add your favourite products to cart and place an order!`}
        />
      </Helmet>
      <Authentication />;
    </>
  );
}

export const authLoader: LoaderFunction = () => {
  const token = getToken();
  if (!token || token === "token expired") {
    return <Outlet />;
  } else {
    return redirect("/");
  }
};
