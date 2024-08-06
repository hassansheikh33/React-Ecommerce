import { useNavigate } from "react-router-dom";
import { Product } from "../../../types";
import ProductItem from "../ProductItem/ProductItem";
import classes from "./Products.module.css";
import { ChangeEvent, useRef, useState } from "react";

interface Props {
  data: Product[];
}

export default function Products(props: Props) {
  const [products, setProducts] = useState<Product[]>(props.data);

  const filterChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    switch (filter) {
      case "electronics":
        setProducts(
          props.data.filter((item) => item.category === "electronics")
        );
        break;
      case "jewelery":
        setProducts(props.data.filter((item) => item.category === "jewelery"));
        break;
      case `men's clothing`:
        setProducts(
          props.data.filter((item) => item.category === `men's clothing`)
        );
        break;
      case `women's clothing`:
        setProducts(
          props.data.filter((item) => item.category === `women's clothing`)
        );
        break;
      default:
        setProducts(props.data);
    }
  };
  const filterRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Products</h1>
      <div className={classes.filter}>
        <label htmlFor="filter">Filter by category</label>
        <select
          name="filter"
          id="filter"
          ref={filterRef}
          onChange={filterChangeHandler}
        >
          <option value="none">none</option>
          <option value="electronics">electronics</option>
          <option value="jewelery">jewelery</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
        </select>
      </div>
      <div className={classes.productsContainer}>
        {products.map((item) => (
          <ProductItem
            onClick={() => navigate(`/shop/${item.id}`, { replace: true })}
            key={item.id}
            product={item}
          />
        ))}
      </div>
    </div>
  );
}
