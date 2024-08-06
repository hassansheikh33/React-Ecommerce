import classes from "./ProductItem.module.css";
import { Product } from "../../../types";
import Card from "../../Card/Card";

interface Props {
  product: Product;
  onClick: () => void;
}

export default function ProductItem(props: Props) {
  return (
    <Card onClick={props.onClick} className={classes.productContainer}>
      <img
        src={props.product.image}
        alt="product image"
        className={classes.image}
      />
      <h3>{props.product.title.slice(0, 50)}...</h3>
      <hr />
      <p>Category: {props.product.category}</p>
      <p>{props.product.description.slice(0, 100)}...</p>
    </Card>
  );
}
