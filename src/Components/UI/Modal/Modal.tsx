import classes from "./Modal.module.css";
import Card from "../Card/Card";
import ReactDOM from "react-dom";
import { PropsWithChildren } from "react";
import { setNofication } from "../../../Util/notification";

interface Props extends PropsWithChildren {
  onClose: () => void;
}

export default function Modal(props: Props) {
  const overlay = document.getElementById("backdrop-root");
  const backdrop = document.getElementById("overlay-root");
  if (!overlay || !backdrop) {
    setNofication("error", "Please reload and try again, Modal|Overlay");
    return;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={props.onClose}></div>,
        backdrop
      )}
      {ReactDOM.createPortal(
        <Card className={classes.modal}>
          <div className={classes.content}>{props.children}</div>
        </Card>,
        overlay
      )}
    </>
  );
}
