import { Drawer } from "..";
import { notificationIconClassName } from "../../../utils/constants";
import { Notifications } from "../../Notifications";
import "./Header.css";

interface HeaderProps {
  title: string;
  showNotificationBtn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showNotificationBtn,
}) => {
  return (
    <div className="header">
      <div className="header-title">
        <h1>{title}</h1>
      </div>
      <div className="header-drawer-container">
        {showNotificationBtn && (
          <Drawer
            iconClassName={notificationIconClassName}
            DrawerContent={Notifications}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
