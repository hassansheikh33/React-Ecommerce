import classes from "./OrderForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/redux-store";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { OrderFormError } from "../../../types";
import { useLoaderData, useNavigate } from "react-router-dom";
import { setNofication } from "../../../Util/notification";
import { getToken } from "../../../Util/token";
import { order, removeAll } from "../../Products/cart-thunks";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import { uiActions } from "../../../store/ui-slice";
import { transformToOrderItem } from "../../../Util/transformProduct";

export default function OrderForm() {
  const orderFormRef = useRef<null | HTMLFormElement>(null);
  const cart = useSelector((state: RootState) => state.cart);
  const uid = getToken();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userData = useLoaderData() as { name: string; email: string };
  const [name, setName] = useState<string>(userData.name);
  const [email, setEmail] = useState<string>(userData.email);
  const numberRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<string>("");
  const [method, setMethod] = useState<"cash" | "card">("cash");
  const [error, setError] = useState<OrderFormError>({
    name: null,
    email: null,
    address: null,
    number: null,
    method: null,
  });
  const nameInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const emailInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const addressInputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
  };
  const paymentMethodChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "cash" || e.target.value === "card") {
      setMethod(e.target.value);
    } else {
      setError((prevState) => ({
        ...prevState,
        method: "Please choose a valid payment method",
      }));
    }
  };

  const orderHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uid) {
      if (
        name === "" ||
        !name.includes(" ") ||
        !email.includes("@") ||
        !email.endsWith(".com") ||
        email === "" ||
        address === "" ||
        address.length < 10 ||
        address === "" ||
        numberRef?.current?.value.toString() === "" ||
        !numberRef?.current?.value.toString().includes("0") ||
        numberRef?.current?.value.toString().length >= 12 ||
        numberRef?.current?.value.toString().length < 11
      ) {
        if (name === "" || !name.includes(" ")) {
          setError((prevState) => {
            return { ...prevState, name: "Please enter a valid Full Name" };
          });
        } else {
          setError((prevState) => ({ ...prevState, name: null }));
        }
        if (!email.includes("@") || !email.endsWith(".com") || email === "") {
          setError((prevState) => {
            return { ...prevState, email: "Please enter a valid Email" };
          });
        } else {
          setError((prevState) => ({ ...prevState, email: null }));
        }
        if (address === "" || address.length < 10 || address === "") {
          setError((prevState) => {
            return {
              ...prevState,
              address:
                "Please enter a valid Address (house #, st #, city, country)",
            };
          });
        } else {
          setError((prevState) => ({ ...prevState, address: null }));
        }
        if (
          numberRef?.current?.value.toString() === "" ||
          !numberRef?.current?.value.toString().includes("0") ||
          numberRef?.current?.value.toString().length >= 12 ||
          numberRef?.current?.value.toString().length < 11
        ) {
          setError((prevState) => {
            return {
              ...prevState,
              number: "Please enter a valid mobile number. eg: 03201119900",
            };
          });
        } else {
          setError((prevState) => ({ ...prevState, number: null }));
        }
        if (!method || (method !== "card" && method !== "cash")) {
          setError((prevState) => {
            return {
              ...prevState,
              method: "Please choose a valid payment method: cash OR card",
            };
          });
        } else {
          setError((prevState) => ({ ...prevState, method: null }));
        }
        setNofication("error", "Pleas enter correct values");
        return;
      }
      const orderItems = cart.cartItems.map((item) =>
        transformToOrderItem(item)
      );
      dispatch(
        order({
          name,
          email,
          address,
          number: Number(numberRef.current.value),
          order: {
            items: orderItems,
            totalAmount: cart.totalAmount,
            totalNumItems: cart.totalNumItems,
          },
          payment_method: method,
          uid,
        })
      );
      dispatch(
        removeAll(uid, {
          title: "Order Placed! We will send you a confirmation email",
          type: "success",
        })
      );
      dispatch(uiActions.setOrderFormShown(false));
      navigate("/");
    }
  };

  useEffect(() => {
    orderFormRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <Card className={classes.orderFormCard}>
      <form
        onSubmit={orderHandler}
        className={classes.orderForm}
        ref={orderFormRef}
      >
        <fieldset className={classes.fieldset}>
          <label htmlFor="name" className={classes.label}>
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name. eg: John Doe"
            className={classes.input}
            value={name}
            onChange={nameInputChangeHandler}
          />
          {error && error.name && <p className={classes.red}>{error.name}</p>}
        </fieldset>
        <fieldset className={classes.fieldset}>
          <label htmlFor="email" className={classes.label}>
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email. eg: johndoe@gmail.com"
            className={classes.input}
            value={email}
            onChange={emailInputChangeHandler}
          />
          {error && error.email && <p className={classes.red}>{error.email}</p>}
        </fieldset>
        <fieldset className={classes.fieldset}>
          <label htmlFor="address" className={classes.label}>
            Your Address
          </label>
          <textarea
            name="address"
            id="address"
            rows={2}
            className={`${classes.input} ${classes.textarea}`}
            value={address}
            placeholder="Enter complete address, eg: house# 13, st. 14, lahore, cantt."
            onChange={addressInputChangeHandler}
          ></textarea>
          {error && error.address && (
            <p className={classes.red}>{error.address}</p>
          )}
        </fieldset>
        <fieldset className={classes.fieldset}>
          <label htmlFor="contact" className={classes.label}>
            Your Contact #
          </label>
          <input
            type="number"
            id="contact"
            name="contact"
            placeholder="Enter your active Contact (11 digits (must include 0)) #. eg: 03201400114"
            className={classes.input}
            ref={numberRef}
          />
          {error && error.number && (
            <p className={classes.red}>{error.number}</p>
          )}
        </fieldset>
        <fieldset className={classes.fieldset}>
          <label htmlFor="payment" className={classes.label}>
            Payment Method
          </label>
          <div className={classes.radioContainer}>
            <label htmlFor="cash">Cash</label>
            <input
              type="radio"
              name="payment"
              id="cash"
              defaultChecked
              value="cash"
              onChange={paymentMethodChangeHandler}
            />
            <label htmlFor="card" className={classes.cardLabel}>
              Card
            </label>
            <input
              type="radio"
              name="payment"
              id="card"
              value="card"
              onChange={paymentMethodChangeHandler}
            />
          </div>
          {error && error.method && (
            <p className={classes.red}>{error.method}</p>
          )}
        </fieldset>
        <Button type="submit" className={classes.orderBtn}>
          Place Order
        </Button>
      </form>
    </Card>
  );
}
