import { PropsWithChildren } from "react";
import classes from "./Card.module.css";

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export default function Card(props: Props) {
  return (
    <div
      onClick={props.onClick}
      className={`${props.className} ${classes.card}`}
    >
      {props.children}
    </div>
  );
}
