import { ChangeEvent, PropsWithChildren } from "react";
import classes from "./QtyForm.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/redux-store";
import { cartActions } from "../../../store/cart-slice";
import { CartItem } from "../../../types";

interface Props extends PropsWithChildren {
  qty?: number;
  setQty?: (qty: number) => void;
  increaseQty?: () => void;
  decreaseQty?: () => void;
  cartItem?: CartItem;
}

export default function QtyForm(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.setQty) {
      props.setQty(Number(e.target.value));
    }
  };
  const decreaseHandler = () => {
    if (props.decreaseQty) {
      props.decreaseQty();
    } else if (props.cartItem) {
      dispatch(cartActions.removeItem(props.cartItem));
    }
  };
  const increaseHandler = () => {
    if (props.increaseQty) {
      props.increaseQty();
    } else if (props.cartItem && props.cartItem.amount < 10) {
      dispatch(cartActions.addItem(props.cartItem));
    }
  };
  return (
    <div className={classes.qtyContainer}>
      <button
        type="button"
        className={`${classes.qtyBtn} ${classes.decreaseBtn}`}
        onClick={decreaseHandler}
      >
        -
      </button>
      {props.qty && (
        <p className={classes.qtyInput} onChange={changeHandler}>
          {props.qty}
        </p>
      )}
      <button
        className={`${classes.qtyBtn} ${classes.increaseBtn}`}
        onClick={increaseHandler}
      >
        +
      </button>
      {props.children}
    </div>
  );
}
