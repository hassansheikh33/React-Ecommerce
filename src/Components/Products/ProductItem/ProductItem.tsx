import classes from "./ProductItem.module.css";
import { Product } from "../../../types";
import Card from "../../UI/Card/Card";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/redux-store";
import Button from "../../UI/Button/Button";
import { addToCart } from "../../../store/cart-thunks";
import { getToken } from "../../../Util/token";
import { setNofication } from "../../../Util/notification";

interface Props {
  product: Product;
  onClick: () => void;
}

export default function ProductItem(props: Props) {
  const uid = getToken();
  const dispatch = useDispatch<AppDispatch>();
  const addtoCartHandler = () => {
    if (uid) {
      dispatch(addToCart(uid, { ...props.product, amount: 1 }));
    } else {
      setNofication("error", "Please Login to add items to Cart!");
    }
  };

  const goToProductPage = () => {
    setNofication("progress", "Redirecting to product description");
    props.onClick();
  };
  return (
    <Card className={classes.productContainer}>
      <div className={classes.pointer} onClick={goToProductPage}>
        <img
          src={props.product.image}
          alt="product image"
          className={classes.image}
        />
        <h3>{props.product.title.slice(0, 30)}...</h3>
      </div>
      <hr />
      <p className={classes.priceRating}>
        <span className={classes.price}>${props.product.price}</span>
        <span className={classes.rating}>
          <span>{props.product.rating.rate} stars</span>
          <span>({props.product.rating.count} ratings)</span>
        </span>
      </p>
      <div className={classes.buttonContainer}>
        <Button onClick={addtoCartHandler} className={classes.red}>
          Add to Cart
        </Button>
        <Button className={classes.seeDetailsBtn} onClick={goToProductPage}>
          See Details
        </Button>
      </div>
    </Card>
  );
}
