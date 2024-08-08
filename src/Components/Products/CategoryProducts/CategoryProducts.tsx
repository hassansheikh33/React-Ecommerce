import { useLoaderData, useNavigate } from "react-router-dom";
import { Product } from "../../../types";
import ProductItem from "../ProductItem/ProductItem";
import classes from "./CategoryProducts.module.css";
import { ChangeEvent, useState } from "react";
import ProductContainer from "../ProductContainer/ProductContainer";

export default function Products() {
  const { data, category } = useLoaderData() as {
    data: Product[];
    category: string;
  };
  console.log(category);
  const [filter, setFilter] = useState<string>("none");

  const filterChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  let sorted: Product[] = [];
  switch (filter) {
    case "PLTH":
      sorted = data.sort((a, b) => a.price - b.price);
      break;
    case "PHTL":
      sorted = data.sort((a, b) => b.price - a.price);
      break;
    case `RLTH`:
      sorted = data.sort((a, b) => a.rating.rate - b.rating.rate);
      break;
    case `RHTL`:
      sorted = data.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    default:
      sorted = data.sort(() => 0.5 - Math.random());
  }
  const [products] = useState<Product[]>(sorted);

  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>{category}</h1>
      <div className={classes.filter}>
        <label htmlFor="filter" className={classes.label}>
          Filter
        </label>
        <select
          name="filter"
          id="filter"
          className={classes.select}
          value={filter}
          onChange={filterChangeHandler}
        >
          <option value="none">none</option>
          <option value="PLTH">Price: Low to High</option>
          <option value="PHTL">Price: High to Low</option>
          <option value="RLTH">Rating: Low to High</option>
          <option value="RHTL">Rating: High to Low</option>
        </select>
      </div>
      <ProductContainer>
        {products.map((item) => (
          <ProductItem
            onClick={() =>
              navigate(`/shop/category/${category}/${item.id}`, {
                replace: true,
              })
            }
            key={item.id}
            product={item}
          />
        ))}
      </ProductContainer>
      {/* similiar products based on category */}
    </div>
  );
}
