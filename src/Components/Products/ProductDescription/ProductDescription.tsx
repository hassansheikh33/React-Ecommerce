import { Params, useParams } from "react-router-dom";
// import { Product } from "../../../types";

export default function ProductDescription() {
  const params = useParams<Params>();
  return (
    <section>
      <h1>Product Description Page</h1>
      <h3>{params.toString()}</h3>
    </section>
  );
}
