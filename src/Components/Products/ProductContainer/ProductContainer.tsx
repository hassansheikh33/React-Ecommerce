import { PropsWithChildren } from "react";
import classes from "./ProductContainer.module.css";

interface Props extends PropsWithChildren {
  style?: {};
}

export default function ProductContainer(props: Props) {
  return (
    <div style={props.style} className={classes.productsContainer}>
      {props.children}
    </div>
  );
}
