import classes from "./ProductItem.module.css";
import { Product } from "../../../types";
import Card from "../../UI/Card/Card";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/redux-store";
import { cartActions } from "../../../store/cart-slice";
import Button from "../../UI/Button/Button";

interface Props {
  product: Product;
  onClick: () => void;
}

export default function ProductItem(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const addtoCartHandler = () => {
    dispatch(cartActions.addItem({ ...props.product, amount: 1 }));
  };
  return (
    <Card className={classes.productContainer}>
      <div className={classes.pointer} onClick={props.onClick}>
        <img
          src={props.product.image}
          alt="product image"
          className={classes.image}
        />
        <h3>{props.product.title.slice(0, 15)}...</h3>
      </div>
      <hr />
      <p className={classes.priceRating}>
        <span className={classes.price}>${props.product.price}</span>
        <span className={classes.rating}>
          <span>{props.product.rating.rate} stars</span>
          <span>({props.product.rating.count}) ratings</span>
        </span>
      </p>
      <Button onClick={addtoCartHandler}>Add to Cart</Button>
    </Card>
  );
}
