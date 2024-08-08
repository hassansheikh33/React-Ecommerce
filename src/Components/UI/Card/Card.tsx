import { PropsWithChildren } from "react";
import classes from "./Card.module.css";

interface Props extends PropsWithChildren {
  className?: string;
  style?: {};
}

export default function Card(props: Props) {
  return (
    <div
      className={`${classes.card} ${props.className ? props.className : ""}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
