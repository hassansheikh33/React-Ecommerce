import classes from "./Login.module.css";
import Button from "../../UI/Button/Button";
import { AdminLoginError } from "../../../types";
import { ChangeEvent, FormEvent, useState } from "react";
import { setNofication } from "../../../Util/notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/redux-store";
import { uiActions } from "../../../store/ui-slice";
import { loginAdmin } from "../../../store/admin-thunks";

export default function Login() {
  const loading = useSelector((state: RootState) => state.ui.loading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [AuthError, setAuthError] = useState<AdminLoginError>({
    email: null,
    password: null,
  });

  const submitHandler = async (e: FormEvent) => {
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
        setNofication("error", "Please enter a valid Email");
        setAuthError((prevState) => ({
          ...prevState,
          email: "Please enter a valid Email. eg: abc@gmail.com",
        }));
      } else {
        setAuthError((prevState) => ({
          ...prevState,
          email: null,
        }));
      }
      if (password.length < 8) {
        setNofication(
          "error",
          "Please enter a valid password (min 8 characters)"
        );
        setAuthError((prevState) => ({
          ...prevState,
          password: "Please enter a valid password. (must include 8 digits)",
        }));
      } else {
        setAuthError((prevState) => ({
          ...prevState,
          password: null,
        }));
      }
    } else {
      try {
        dispatch(uiActions.setLoading(true));
        const response = await dispatch(loginAdmin({ email, password }));
        dispatch(uiActions.setMode("admin"));
        localStorage.setItem("admin", response);
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        localStorage.setItem("expiration", expirationDate.toISOString());
        setNofication("success", `Welcome ${response}`);
        setEmail("");
        setPassword("");
        navigate("/admin/dashboard");
      } catch (err: any) {
        setNofication("error", err.message);
        dispatch(uiActions.setLoading(false));
      }
    }
  };

  const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Admin Login</h1>
      <form onSubmit={submitHandler}>
        <fieldset className={classes.fieldset}>
          <label className={classes.label} htmlFor="Email">
            Email*
          </label>
          <input
            className={classes.input}
            value={email}
            placeholder="eg: johndoe@gmail.com"
            type="email"
            id="Email"
            onChange={emailChange}
            autoComplete="email"
          />
          {AuthError.email && <p className={classes.red}>{AuthError.email}</p>}
        </fieldset>
        <fieldset className={classes.fieldset}>
          <label className={classes.label} htmlFor="password">
            Password*
          </label>
          <input
            className={classes.input}
            value={password}
            placeholder="Enter password (min 8 chatacters)"
            onChange={passwordChange}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {AuthError.password && (
            <p className={classes.red}>{AuthError.password}</p>
          )}
        </fieldset>
        <Button type="submit" className={classes.submitBtn} disabled={loading}>
          {loading ? <div className={classes.spinner}></div> : "Login"}
        </Button>
      </form>
    </div>
  );
}
