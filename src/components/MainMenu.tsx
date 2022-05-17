import { useContext, useEffect, useState } from "react";
import "./MainMenu.css";
import UserContext from "../store/UserContext";
import { UserRoles } from "../enums/UsersEnums";
import { MenuItem } from "../interfaces/MenuItemInterface";
import { rolesToMenuItems, defaultMenuItems } from "../resources/menuItems";
import { Link } from "react-router-dom";
import { Icon } from "@mui/material";

const MainMenu = () => {
  const userContext = useContext(UserContext);
  const [userRoles, setUserRoles] = useState<UserRoles[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setUserRoles(userContext.roles);
  }, [userContext]);

  useEffect(() => {
    const menuItems: MenuItem[] = [];

    for (const userRole of userRoles) {
      if (rolesToMenuItems.hasOwnProperty(userRole)) {
        menuItems.push(...rolesToMenuItems[userRole]);
      }
    }

    menuItems.push(...defaultMenuItems);

    setMenuItems(menuItems);
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

      <span className="app-version">
        Version: <span>{process.env.REACT_APP_VERSION}</span>
      </span>
    </div>
  );
};

export default MainMenu;
