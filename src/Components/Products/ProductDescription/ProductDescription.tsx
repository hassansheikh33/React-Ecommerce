import { useLoaderData } from "react-router-dom";
import classes from "./ProductDescription.module.css";
import { Product } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/redux-store";
import { cartActions } from "../../../store/cart-slice";

export default function ProductDescription() {
  const dispatch = useDispatch<AppDispatch>();
  const product = useLoaderData() as Product;
  const addtoCartHandler = () => {
    dispatch(cartActions.addItem({ ...product, amount: 1 }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img
          src={product.image}
          alt="product Image"
          className={classes.image}
        />
      </div>
      <div className={classes.details}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>
          {product.rating.rate} stars ({product.rating.count} ratings)
        </p>
        <div className={classes.buttonContainer}>
          <button
            className={`${classes.addToCartBtn} ${classes.btn}`}
            onClick={addtoCartHandler}
          >
            Add to Cart
          </button>
          {/* make a go back button here by creating histroy array in redux and storing the current path by using useLocation */}
          <button className={`${classes.backBtn} ${classes.btn}`}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
