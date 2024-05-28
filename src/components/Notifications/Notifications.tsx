import { useMemo, useState } from "react";
import "./Notifications.css";
import { useAllCustomerUnreadRecords } from "./services";
import { MetricTypes, Notification } from "./types";
import { getNotificationTypeIconClassName } from "./helpers";

interface NotificationProps {
  onCloseDrawer?: () => void;
}

/*
 * Assumption: Types of notifications are success, warning and failed,
 * Based on those types, icons will be displayed
 */

/*
 * Assumption: By Read badge it means a badge on notification will show 'Read' or 'Unread',
 * initially all notifications will be unread and when marked as read, badge will turn to Read and disappear
 */

/*
 * Edge case 1: If notification title/description is more in length, then ellipses will be shown
 * Customer can click on the notification to navigate to the metrics and look for details
 * or Tooltip can be added in order to display the whole message
 * or clicking on ellipses can expand the notification panel to display the text, it is assumed that the message sent by the backend will be within the length range
 */

/*
 * Edge case 2: For no notifications i.e. when notifications.length === 0
 * Currently for mark all as read, the same message is displayed, this can be modified by providing custom message specific to that scenario
 * Custom no notification message will be displayed
 */

/*
 * Edge case 3: For loading state
 * A simple loading message is shown
 */

/*
 * Edge case 4: On the initial load only 4 notifications will be shown with a see more button, this is implemented to accomodate few numbers of notifications
 * user can click on it to load other 4 which will replace previous 4
 * Assumption is taht the list of notifications will be less and therefore this approach works
 * If list going to be 100s of notifications, then a new page should be created and see more will navigate to the Notifications page with all the notifications
 * Also, "Reload notification" button is shown in the end of the list to reload unread set of notifications
 */

export const Notifications: React.FC<NotificationProps> = ({
  onCloseDrawer,
}) => {
  const orgId = 1; //assumption: since, we are directly navigating to customer portal, orgId will be available through authcontext
  const { data, isLoading, error } = useAllCustomerUnreadRecords(orgId);
  const [notifications, setNotifications] = useState<Notification[]>(
    data as Notification[]
  );
  const [recordId, setRecordId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const rowsPerPage = 4;

  const loadRows = useMemo(() => {
    return notifications.slice(currentIndex, currentIndex + rowsPerPage);
  }, [currentIndex, notifications]);

  const seeMore = () => {
    setCurrentIndex((prevIndex) => prevIndex + rowsPerPage);
  };

  const reloadNotifications = () => {
    setCurrentIndex(0);
  };

  const handleReadIndex = (id: number | null) => {
    const notification = notifications.find(
      (notification) => notification.recordId === id
    );
    notification!.isRead = true;
    setNotifications([...notifications]);
    setTimeout(() => {
      //adding settimeout to display taht notification is amrked as read and then it disappears
      setRecordId(id);
    }, 500);
  };

  //clicking notification will open usage metrics page in new tab with param as ":metrics" provided in Notification payload
  const openAboutInNewTab = (metrics: MetricTypes) => {
    const url = window.location.origin + `/usage-metrics/${metrics}`;
    window.open(url, "_blank");
  };

  const handleMarkAsRead = () => {
    if (recordId !== null) {
      const newData = [...notifications].filter(
        (notification) => notification.recordId !== recordId
      );
      //useMarkProvidedCustomerRecordsRead(orgId, newData[deletingIndex].recordId ) => This method will be called to mark particular notification as read in backend
      setNotifications(newData);
      setRecordId(null);
    }
  };

  const handleMarkAllAsRead = () => {
    const newData = [...notifications];
    newData.map((notif) => (notif.isRead = true));
    //useMarkAllCustomerRecordsRead(orgId)
    //above endpoint will be called to mark all notifications as read in the backend
    setNotifications(newData);
    setTimeout(() => {
      //using set timeout here to mimic realtime scenario where calling an endpoint will take sometime to mark all notif as read and reflecting the data
      setNotifications([]);
    }, 1000);
  };

  return (
    <>
      <div className="notification-panel-header">
        <div className="notification-panel-header-title">
          <h3>Notifications</h3>
        </div>
        <div className="notification-panel-header-actions">
          <button
            disabled={notifications.length === 0 || isLoading || error !== null}
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </button>
          <div>|</div>
          <button onClick={onCloseDrawer}>X</button>
        </div>
      </div>
      <hr />
      <div className="notification-list">
        {!isLoading && !error && notifications && notifications.length > 0 ? (
          loadRows.map((notification, index) => {
            return (
              <div
                key={notification.recordId}
                className={`notification-list-panel ${
                  recordId === notification.recordId ? "fade-out" : ""
                }`}
                onClick={() => {
                  handleReadIndex(notification.recordId);
                  openAboutInNewTab(notification.metrics);
                }}
                onAnimationEnd={handleMarkAsRead}
              >
                <div className="panel-info">
                  <div className="icon">
                    <i
                      className={getNotificationTypeIconClassName(
                        notification.type
                      )}
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="title">{notification.title}</div>
                </div>
                <div className="panel-description">
                  <p>{notification.description}</p>
                </div>
                <div className="panel-actions">
                  <div className="badge">
                    <p>{notification.isRead ? "Read" : "Unread"}</p>
                  </div>
                  <div className="mark-read">
                    <input
                      type="checkbox"
                      id="mark-as-read"
                      name="mark-as-read"
                      checked={notification.isRead || false}
                      onClick={(event) => event.stopPropagation()}
                      onChange={() => handleReadIndex(notification.recordId)}
                    />
                    <label htmlFor="mark-as-read"> Mark as read</label>
                  </div>
                </div>
              </div>
            );
          })
        ) : isLoading && !error && notifications.length === 0 ? (
          <div>Loading..... </div>
        ) : (
          <div className="no-notifications">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            <span>No new notifications</span>
          </div>
        )}

        {currentIndex + rowsPerPage < notifications.length && (
          <div className="panel-button-container">
            {" "}
            <button className="panel-button" onClick={seeMore}>
              See More
            </button>
          </div>
        )}

        {currentIndex + rowsPerPage >= notifications.length &&
          notifications.length !== 0 && (
            <div className="panel-button-container">
              <button className="panel-button" onClick={reloadNotifications}>
                Reload notifications
              </button>
            </div>
          )}
      </div>
    </>
  );
};

export default Notifications;
