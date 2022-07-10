import "./Notification.css";
import {useSelector} from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) return;

  return (
    <div className="notification_container">
      <h1 className={notification.classType}>{notification.text}</h1>
    </div>
  );
};

export default Notification;
