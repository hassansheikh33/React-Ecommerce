import { Helmet } from "react-helmet";
import Home from "../Components/Home/Home";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Welcome to React Commerce! A one stop shop for every age!"
        />
      </Helmet>
      <Home />;
    </>
  );
}
