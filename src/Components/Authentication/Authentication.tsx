import classes from "./Authentication.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux-store";
import { uiActions } from "../../store/ui-slice";

export default function Authentication() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      email.length === 0 ||
      !email.includes("@") ||
      !email.endsWith(".com") ||
      password.length < 8
    ) {
      if (
        email.length === 0 ||
        !email.includes("@") ||
        !email.endsWith(".com")
      ) {
        dispatch(
          uiActions.addNotification({
            type: "error",
            title: "Please enter a valid Email",
          })
        );
        setTimeout(() => {
          dispatch(uiActions.removeNotification());
        }, 2000);
      }
      if (password.length < 8) {
        dispatch(
          uiActions.addNotification({
            type: "error",
            title: "Please enter a valid password (minimum 8 characters)",
          })
        );
        setTimeout(() => {
          dispatch(uiActions.removeNotification());
        }, 2000);
      }
    } else {
      console.log(email, password);
      setEmail("");
      setPassword("");
      dispatch(
        uiActions.addNotification({
          type: "success",
          title: "User Registered Successfully",
        })
      );
      setTimeout(() => {
        dispatch(uiActions.removeNotification());
      }, 2000);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Login/Signup</h1>
      <Card className={classes.formContainer}>
        <h2>
          Welcome! Please <span className={classes.red}>Login</span> to make any
          purchase.
        </h2>
        <form onSubmit={submitHandler}>
          <fieldset className={classes.fieldset}>
            <label htmlFor="Email">Email*</label>
            <input
              value={email}
              placeholder="eg: johndoe@gmail.com"
              type="email"
              id="Email"
              onChange={emailChange}
            />
          </fieldset>
          <fieldset className={classes.fieldset}>
            <label htmlFor="password">Password* (min 8 chatacters)</label>
            <input
              value={password}
              placeholder="Enter password"
              onChange={passwordChange}
              type="text"
              id="password"
            />
          </fieldset>
          <Button type="submit" className={classes.submitBtn}>
            Login/Signup
          </Button>
        </form>
      </Card>
    </div>
  );
}
