import { useLoaderData } from "react-router-dom";
import classes from "./ProductDescription.module.css";
import { Product } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/redux-store";
import { cartActions } from "../../../store/cart-slice";
import { useState } from "react";
import QtyForm from "../../UI/QtyForm/QtyForm";
import Button from "../../UI/Button/Button";

export default function ProductDescription() {
  const [qty, setQty] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const product = useLoaderData() as Product;
  const addtoCartHandler = () => {
    dispatch(cartActions.addItem({ ...product, amount: qty }));
  };

  const increaseQty = () => {
    if (qty === 10) {
      return;
    }
    setQty((qty) => qty + 1);
  };

  const decreaseQty = () => {
    if (qty === 1) {
      return;
    }
    setQty((qty) => qty - 1);
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
        <div>
          <QtyForm
            qty={qty}
            setQty={setQty}
            decreaseQty={decreaseQty}
            increaseQty={increaseQty}
          />
          <Button onClick={addtoCartHandler}>Add to Cart</Button>
          {/* make a go back button here by creating histroy array in redux and storing the current path by using useLocation */}
          {/* <button className={`${classes.backBtn} ${classes.btn}`}>
            Go Back
          </button> */}
        </div>
      </div>
    </div>
  );
}
