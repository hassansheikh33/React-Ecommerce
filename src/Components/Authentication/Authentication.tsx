import classes from "./Authentication.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/redux-store";
import { uiActions } from "../../store/ui-slice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, fs } from "../../Config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { setNofication } from "../../Util/notification";

export default function Authentication() {
  const loading = useSelector((state: RootState) => state.ui.loading);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode");
  const isLogin = mode === "login";

  useEffect(() => {
    if (mode && mode !== "signup" && mode !== "login") {
      throw new Error("Invalid authentication mode");
    } else if (!mode) {
      navigate("/auth?mode=signup", { replace: true });
    }
  }, []);

  const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (isLogin) {
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
        }
        if (password.length < 8) {
          setNofication(
            "error",
            "Please enter a valid password (min 8 characters)"
          );
        }
      } else {
        try {
          dispatch(uiActions.setLoading(true));
          const SignIninfo = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          dispatch(uiActions.setToken(SignIninfo.user.uid));
          const expirationDate = new Date();
          expirationDate.setMinutes(expirationDate.getMinutes() + 30);
          localStorage.setItem("expiration", expirationDate.toISOString());
          setNofication("success", "Login Successfull");
          dispatch(uiActions.setLoading(false));
          navigate("/");
        } catch (err: any) {
          //only display the real err message, currently displays Firebase: Error: (auth/ real error message)
          setNofication("error", err.message);
          dispatch(uiActions.setLoading(false));
        }
        setEmail("");
        setPassword("");
      }
    } else {
      if (
        email.length === 0 ||
        !email.includes("@") ||
        !email.endsWith(".com") ||
        password.length < 8 ||
        name === "" ||
        !name.includes(" ")
      ) {
        if (
          email.length === 0 ||
          !email.includes("@") ||
          !email.endsWith(".com")
        ) {
          setNofication("error", "Please enter a valid Email");
        }
        if (password.length < 8) {
          setNofication(
            "error",
            "Please enter a valid password (min 8 characters)"
          );
        }
        if (name === "" || !name.includes(" ")) {
          setNofication("error", "Please enter your valid full name");
        }
      } else {
        try {
          dispatch(uiActions.setLoading(true));
          const signUpInfo = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password.trim()
          );
          const uid = signUpInfo.user.uid;
          const user = {
            email: email.trim(),
            name: name.trim(),
            uid,
            cart: {
              cartItems: [],
              totalNumItems: 0,
              totalAmount: 0,
            },
          };
          const userDocReference = doc(fs, "users", uid);
          await setDoc(userDocReference, user);
          dispatch(uiActions.setToken(uid));
          const expirationDate = new Date();
          expirationDate.setMinutes(expirationDate.getMinutes() + 30);
          localStorage.setItem("expiration", expirationDate.toISOString());
          setNofication("success", "User Registered Successfully.");
          dispatch(uiActions.setLoading(false));
          navigate("/");
        } catch (err: any) {
          //only display the real err message, currently displays Firebase: Error: (auth/ real error message)
          setNofication("error", err.message);
          dispatch(uiActions.setLoading(false));
        }
        setName("");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.formContainer}>
        <h1 className={classes.heading}>{isLogin ? "Login" : "Signup"}</h1>
        {isLogin && (
          <p className={classes.mesText}>
            Welcome! Please <span className={classes.red}>Login</span> to make
            any purchase.
          </p>
        )}
        {!isLogin && (
          <p className={classes.mesText}>
            Please <span className={classes.red}>Signup</span> and you will be
            automatically logged in to your account.
          </p>
        )}
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <fieldset className={classes.fieldset}>
              <label className={classes.label} htmlFor="name">
                Full Name*
              </label>
              <input
                className={classes.input}
                value={name}
                placeholder="eg: johndoe@gmail.com"
                type="text"
                id="name"
                onChange={nameChange}
              />
            </fieldset>
          )}
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
            />
          </fieldset>
          <fieldset className={classes.fieldset}>
            <label className={classes.label} htmlFor="password">
              Password* (min 8 chatacters)
            </label>
            <input
              className={classes.input}
              value={password}
              placeholder="Enter password"
              onChange={passwordChange}
              type="password"
              id="password"
            />
          </fieldset>
          <Button
            type="submit"
            className={classes.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <div className={classes.spinner}></div>
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </Button>
        </form>
        <Link
          className={classes.changeModeBtn}
          to={`/auth?mode=${isLogin ? "signup" : "login"}`}
        >
          {isLogin ? "Not a user? Signup Now" : "Already a user? Login"}
        </Link>
      </Card>
    </div>
  );
}
