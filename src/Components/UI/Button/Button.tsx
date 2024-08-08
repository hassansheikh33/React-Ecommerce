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
        props.className ? `${props.className} ${classes.btn}` : classes.btn
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
