import { NotificationType } from "../../types";
import classes from "./Notification.module.css";

export default function Notification(props: NotificationType) {
  return (
    <div
      className={`${classes.container} ${
        props.type === "error" ? classes.error : classes.success
      }`}
    >
      <p>{props.title}</p>
    </div>
  );
}
