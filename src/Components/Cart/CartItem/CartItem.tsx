import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../types";
import Card from "../../UI/Card/Card";
import QtyForm from "../../UI/QtyForm/QtyForm";
import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/redux-store";
import RedBtn from "../../UI/Button/Button";
import { removeItemFromCart } from "../../../store/cart-thunks";
import { getToken } from "../../../Util/token";

interface Props {
  item: CartItem;
}

export default function SingleCartItem({ item }: Props) {
  const uid = getToken();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const deleteFromCartHandler = () => {
    if (uid) {
      dispatch(removeItemFromCart(uid, item));
    }
  };
  return (
    <Card className={classes.itemContainer}>
      <img
        src={item.image}
        alt="item image"
        className={classes.image}
        onClick={() => navigate(`/shop/category/${item.category}/${item.id}`)}
      />
      <div className={classes.detailsContainer}>
        <h2
          className={classes.itemTitle}
          onClick={() => navigate(`/shop/category/${item.category}/${item.id}`)}
        >
          {item.title}
        </h2>
        <p>
          ${item.price.toFixed(2)} * {item.amount} = $
          {(item.price * item.amount).toFixed(2)}
        </p>
        <p>id: {item.id}</p>
        <p>
          {item.rating.rate} stars ({item.rating.count} ratings)
        </p>
        <QtyForm uid={uid ? uid : null} cartItem={{ ...item, amount: 1 }}>
          <RedBtn className={classes.delBtn} onClick={deleteFromCartHandler}>
            Delete
          </RedBtn>
        </QtyForm>
      </div>
    </Card>
  );
}
