import { useNavigate } from "react-router-dom";
import { Product } from "../../../types";
import ProductContainer from "../ProductContainer/ProductContainer";
import ProductItem from "../ProductItem/ProductItem";
import BrowseCategory from "../../BrowseCategory/BrowseCategory";
import { ChangeEvent, useState } from "react";
import classes from "./AllProducts.module.css";

interface Props {
  data: Product[];
}

export default function AllProducts(props: Props) {
  const [filter, setFilter] = useState<string>("none");

  const filterChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  let sorted: Product[] = [];
  switch (filter) {
    case "PLTH":
      sorted = props.data.sort((a, b) => a.price - b.price);
      break;
    case "PHTL":
      sorted = props.data.sort((a, b) => b.price - a.price);
      break;
    case `RLTH`:
      sorted = props.data.sort((a, b) => a.rating.rate - b.rating.rate);
      break;
    case `RHTL`:
      sorted = props.data.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    default:
      sorted = props.data.sort(() => 0.5 - Math.random());
  }

  const [products] = useState<Product[]>(sorted);

  const navigate = useNavigate();

  return (
    <div>
      <h1 className={classes.heading}>All Products</h1>
      <div className={classes.filter}>
        <label htmlFor="filter" className={classes.label}>
          Filter
        </label>
        <select
          name="filter"
          className={classes.select}
          id="filter"
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
              navigate(`/shop/category/${item.category}/${item.id}`)
            }
            key={item.id}
            product={item}
          />
        ))}
      </ProductContainer>
      <BrowseCategory title="Browse By Category" />
    </div>
  );
}
