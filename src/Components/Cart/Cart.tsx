import CartItem from "./CartItem/CartItem";
import classes from "./Cart.module.css";

export default function Cart() {
  return (
    <>
      <h1 className={classes.heading}>Cart</h1>
      <CartItem />
    </>
  );
}
