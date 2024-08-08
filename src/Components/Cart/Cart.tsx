import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/redux-store";
import Card from "../UI/Card/Card";
import SingleCartItem from "./CartItem/CartItem";
import Button from "../UI/Button/Button";
import { cartActions } from "../../store/cart-slice";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const NumOfItems = useSelector(
    (state: RootState) => state.cart.totalNumItems
  );

  const dispatch = useDispatch<AppDispatch>();

  const orderHandler = () => {
    dispatch(cartActions.clearCart());
  };

  const clearCartHandler = () => {
    dispatch(cartActions.clearCart());
  };
  return (
    <>
      {cartItems.length > 0 && (
        <div className={classes.container}>
          <h1 onClick={() => console.log(cartItems)}>
            Your <span className={classes.red}>Cart</span>
          </h1>
          <div className={classes.cartDetails}>
            <div className={classes.items}>
              {cartItems.map((item) => (
                <SingleCartItem item={item} key={item.id} />
              ))}
            </div>
            <Card className={classes.ItemSummary}>
              <h3 className={classes.summaryHeading}>
                Cart <span className={classes.summary}>Summary</span>
              </h3>
              <hr />
              <p>Total Amount: ${totalAmount.toFixed(2)}</p>
              <p>Total Number of Items: {NumOfItems}</p>
              <Button onClick={orderHandler} className={classes.checkoutBtn}>
                Checkout?
              </Button>
            </Card>
          </div>
          <Button onClick={clearCartHandler} className={classes.clear}>
            Clear Cart
          </Button>
        </div>
      )}
      {cartItems.length === 0 && (
        <div className={`${classes.container} ${classes.empty}`}>
          <h1>
            Your Cart is <span className={classes.red}>Empty</span>
          </h1>
          <p>Please add some items to continue</p>
        </div>
      )}
    </>
  );
}
