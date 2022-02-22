import { useContext, useEffect, useState } from "react";
import "./MainMenu.css";

import { unverifiedMenuItems, adminMenuItems } from "../resources/menuItems";
import { MenuItem } from "../interfaces/MenuItemInterface";
import { CurrentUser } from "../interfaces/UserInterfaces";

import UserContext from "../store/UserContext";
import { Link } from "react-router-dom";
import { Icon } from "@mui/material";

const MainMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [userRoles, setUserRoles] = useState<number[]>([]);

  const userContext = useContext(UserContext);

  useEffect(() => {
    setUserRoles(userContext.roles);
  }, [userContext]);

  useEffect(() => {
    if (userRoles.length === 0) {
      setMenuItems(unverifiedMenuItems);
    } else if (userRoles.includes(250)) {
      setMenuItems(adminMenuItems);
    }
  }, [userRoles]);

  return (
    <div className="menu-wrapper">
      {menuItems.map((item, index) => (
        <Link
          key={`link-${index}`}
          to={item.link}
          className="menu-item-wrapper"
          style={{ textDecoration: "none" }}
        >
          <div className="link-wrapper">
            <Icon sx={{ fontSize: 50 }}>{item.icon}</Icon>
            {item.text}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainMenu;
