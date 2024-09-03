import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/redux-store";
import Card from "../UI/Card/Card";
import SingleCartItem from "./CartItem/CartItem";
import Button from "../UI/Button/Button";
import BrowseCategory from "../BrowseCategory/BrowseCategory";
import { fetchCart, removeAll } from "../Products/cart-thunks";
import { getToken } from "../../Util/token";
import { useEffect } from "react";
import { uiActions } from "../../store/ui-slice";
import { Outlet, useNavigate } from "react-router-dom";

export default function Cart() {
  const uid = getToken();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const NumOfItems = useSelector(
    (state: RootState) => state.cart.totalNumItems
  );

  const loading = useSelector((state: RootState) => state.ui.loading);

  const dispatch = useDispatch<AppDispatch>();

  const clearCartHandler = () => {
    if (uid)
      dispatch(removeAll(uid, { title: "Cart is Empty!", type: "error" }));
  };

  useEffect(() => {
    if (uid) {
      dispatch(fetchCart(uid));
    }
  }, [uid, dispatch]);

  const navigate = useNavigate();

  const orderFormShown = useSelector(
    (state: RootState) => state.ui.orderFormShown
  );

  const showOrderForm = () => {
    dispatch(uiActions.setOrderFormShown(true));
    navigate("/cart/order", { replace: true });
  };

  return (
    <>
      {loading && (
        <div className={classes.loadingDiv}>
          <h2>Updating Cart</h2>
          <div className={classes.spinner}></div>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className={classes.container}>
          <h1 className={classes.center}>
            Your <span className={classes.red}>Cart</span>
          </h1>
          <p className={classes.center}>
            <Button onClick={clearCartHandler} className={classes.clear}>
              Clear Cart
            </Button>
          </p>
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
              {orderFormShown && (
                <p className={classes.summary}>
                  Please fill in the form below to place an order!
                </p>
              )}
              {!orderFormShown && (
                <Button onClick={showOrderForm} className={classes.checkoutBtn}>
                  Checkout?
                </Button>
              )}
            </Card>
          </div>
          {orderFormShown && <Outlet />}
          <BrowseCategory title="Browse More Products" />
        </div>
      )}
      {!loading && cartItems.length === 0 && (
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
