/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./Drawer.css";

interface DrawerProps {
  iconClassName: string;
  DrawerContent: React.FC<{ onCloseDrawer?: () => void }>;
}
/*
 * iconClassName will use any icon we wish to use for drawer component
 * DrawerContent will accept the React component to be displayed as a content
 * These props will help in reusing the component
 */
export const Drawer: React.FC<DrawerProps> = ({
  iconClassName,
  DrawerContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<any>(null);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target) &&
      event.target !== document.getElementsByClassName(iconClassName)[0]
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      <button className="drawer-toggle" onClick={toggleDrawer}>
        <i className={iconClassName}></i>
      </button>
      <div className={`drawer ${isOpen ? "open" : ""}`} ref={drawerRef}>
        <DrawerContent onCloseDrawer={() => setIsOpen(false)} />
      </div>
    </>
  );
};

export default Drawer;
