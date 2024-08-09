import { PropsWithChildren } from "react";
import classes from "./Button.module.css";

interface Props extends PropsWithChildren {
  className?: string;
  onClick: () => void;
}

export default function Button(props: Props) {
  return (
    <button
      type="button"
      className={
        props.className ? `${classes.btn} ${props.className}` : classes.btn
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
