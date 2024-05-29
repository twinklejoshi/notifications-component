import {
  failedNotificationTypeIconClassName,
  successNotificationTypeIconClassName,
  warningNotificationTypeIconClassName,
} from "../../../utils";
import { Notification, NotificationTypes } from "../types";
import "./NotificationInfo.css";

interface NotificationInfoProps {
  notification: Notification;
}

const getNotificationTypeIconClassName = (
  notificationType: NotificationTypes
) => {
  switch (notificationType) {
    case NotificationTypes.SUCCESS:
      return successNotificationTypeIconClassName;
    case NotificationTypes.WARNING:
      return warningNotificationTypeIconClassName;
    case NotificationTypes.FAILED:
      return failedNotificationTypeIconClassName;
  }
};

export const NotificationInfo = ({ notification }: NotificationInfoProps) => {
  return (
    <>
      <div className="panel-info">
        <div className="icon">
          <i
            className={getNotificationTypeIconClassName(notification.type)}
            aria-hidden="true"
          ></i>
        </div>
        <div className="title">{notification.title}</div>
      </div>
      <div className="panel-description">
        <p>{notification.description}</p>
      </div>
    </>
  );
};

export default NotificationInfo;
