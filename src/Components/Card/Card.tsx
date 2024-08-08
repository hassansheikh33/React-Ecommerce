import { PropsWithChildren } from "react";
import classes from "./Card.module.css";

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  style?: {};
}

export default function Card(props: Props) {
  return (
    <div
      onClick={props.onClick}
      className={`${props.className} ${classes.card}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
