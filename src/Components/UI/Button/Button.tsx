import { PropsWithChildren } from "react";
import classes from "./Button.module.css";

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  type?: "reset" | "submit" | "button";
}

export default function Button(props: Props) {
  return (
    <button
      type={props.type ? props.type : "button"}
      className={
        props.className ? `${classes.btn} ${props.className}` : classes.btn
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
