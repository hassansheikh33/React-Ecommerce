import { useSelector } from "react-redux";
import classes from "./Notification.module.css";
import { RootState } from "../../store/redux-store";

export default function Notification() {
  const notifications = useSelector(
    (state: RootState) => state.ui.notifications
  );
  if (notifications.length > 0) {
    return (
      <div className={classes.notificationsContainer}>
        {notifications.map((noti, index) => (
          <div
            key={index}
            className={`${classes.notification} ${
              noti.type === "error" ? classes.error : classes.success
            }`}
          >
            <p>{noti.title}</p>
          </div>
        ))}
      </div>
    );
  }
}
