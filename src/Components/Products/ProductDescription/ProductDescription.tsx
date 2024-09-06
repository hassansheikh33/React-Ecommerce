import { useNavigate } from "react-router-dom";
import classes from "./ProductDescription.module.css";
import { Product } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/redux-store";
import { useState } from "react";
import QtyForm from "../../UI/QtyForm/QtyForm";
import Button from "../../UI/Button/Button";
import ProductItem from "../ProductItem/ProductItem";
import { addToCart } from "../cart-thunks";
import { getToken } from "../../../Util/token";
import { setNofication } from "../../../Util/notification";

interface Props {
  data: Product[];
  otherProducts: Product[];
  product: Product;
}

export default function ProductDescription(props: Props) {
  const uid = getToken();
  const [qty, setQty] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const addtoCartHandler = () => {
    if (uid) {
      dispatch(addToCart(uid, { ...props.product, amount: qty }));
    } else {
      setNofication("error", "Please Login to add items to Cart!");
    }
    setQty(1);
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
    <div>
      <div className={classes.Itemcontainer}>
        <div className={classes.imageContainer}>
          <img
            src={props.product.image}
            alt="product Image"
            className={classes.image}
          />
        </div>
        <div className={classes.details}>
          <h1>{props.product.title}</h1>
          <p className={classes.description}>{props.product.description}</p>
          <h3>${props.product.price}/-</h3>
          <p>
            {props.product.rating.rate} stars ({props.product.rating.count}{" "}
            ratings)
          </p>
          <div>
            <QtyForm
              qty={qty}
              setQty={setQty}
              decreaseQty={decreaseQty}
              increaseQty={increaseQty}
            />
            <Button onClick={addtoCartHandler} className={classes.red}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.moreItems}>
        <h2>
          Check out other products in{" "}
          <span className={classes.capitalize}>{props.product.category}</span>
        </h2>
        <div className={classes.moreContainer}>
          {props.otherProducts.map((item, index) => {
            return (
              <ProductItem
                key={index}
                product={item}
                onClick={() =>
                  navigate(`/shop/category/${item.category}/${item.id}`, {
                    replace: true,
                  })
                }
              ></ProductItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}
