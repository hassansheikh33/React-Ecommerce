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
      <h3>{props.product.title.slice(0, 15)}...</h3>
      <hr />
      <p className={classes.priceRating}>
        <span className={classes.price}>${props.product.price}</span>
        <span className={classes.rating}>
          <span>{props.product.rating.rate} stars</span>
          <span>{props.product.rating.count} ratings</span>
        </span>
      </p>
    </Card>
  );
}
