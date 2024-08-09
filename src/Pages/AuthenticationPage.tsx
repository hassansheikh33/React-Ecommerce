import { LoaderFunction } from "react-router-dom";
import Authentication from "../Components/Authentication/Authentication";

export default function AuthenticationPage() {
  return <Authentication />;
}

export const authLoader: LoaderFunction = () => {
  return null;
};
