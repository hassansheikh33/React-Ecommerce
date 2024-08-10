import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/redux-store";
import Card from "../UI/Card/Card";
import SingleCartItem from "./CartItem/CartItem";
import Button from "../UI/Button/Button";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import BrowseCategory from "../BrowseCategory/BrowseCategory";

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
    dispatch(
      uiActions.addNotification({
        title: "Cart Empty!",
        type: "error",
      })
    );
    setTimeout(() => {
      dispatch(uiActions.removeNotification());
    }, 1500);
    dispatch(cartActions.clearCart());
  };
  return (
    <>
      {cartItems.length > 0 && (
        <div className={classes.container}>
          <h1 className={classes.center}>
            Your <span className={classes.red}>Cart</span>
          </h1>
          <div className={classes.cartDetails}>
            <div className={classes.items}>
              {cartItems.map((item) => (
                <SingleCartItem item={item} key={item.id} />
              ))}
            </div>
            <Card className={`${classes.ItemSummary} ${classes.center}`}>
              <h2 className={classes.summaryHeading}>
                Cart <span className={classes.summary}>Summary</span>
              </h2>
              <hr />
              <p>Total Amount: ${totalAmount.toFixed(2)}</p>
              <p>Total Number of Items: {NumOfItems}</p>
              <Button onClick={orderHandler} className={classes.checkoutBtn}>
                Checkout?
              </Button>
            </Card>
          </div>
          <p className={classes.center}>
            <Button onClick={clearCartHandler} className={classes.clear}>
              Clear Cart
            </Button>
          </p>
          <BrowseCategory title="Browse More Products" />
        </div>
      )}
      {cartItems.length === 0 && (
        <div className={`${classes.container} ${classes.empty}`}>
          <div className={classes.center}>
            <h1>
              Your Cart is <span className={classes.red}>Empty</span>
            </h1>
            <p>Please add some items to continue</p>
          </div>
          <BrowseCategory title="Browse Products" />
        </div>
      )}
    </>
  );
}
